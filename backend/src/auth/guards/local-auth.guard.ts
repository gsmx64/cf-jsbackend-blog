import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PUBLIC_KEY } from '../../constants/key.decorators';
import { UsersService } from '../../users/services/users.service';
import { useToken } from '../../utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';


/**
 * Guard that implements CanActivate interface to handle local authentication.
 */
@Injectable()
export class LocalAuthGuard implements CanActivate {
    constructor(
        private readonly userService: UsersService,
        private readonly reflector: Reflector
    ) {}

    /**
     * Determines if the route can be activated.
     * @param context - The execution context.
     * @returns A boolean indicating if the route can be activated.
     * @throws UnauthorizedException if the token is invalid, expired, or the user is invalid.
     */
    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>(
            PUBLIC_KEY,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();

        const token = req.headers['access_token'];
        if (!token || Array.isArray(token)) {
            throw new UnauthorizedException('Invalid token!');
        }

        const manageToken: IUseToken | string = useToken(token);

        if (typeof manageToken === 'string') {
            throw new UnauthorizedException(manageToken);
        }

        // TODO: Verify thisconsole.log(manageToken);
        if (manageToken.isExpired) {
            throw new UnauthorizedException('Token expired!');
        }

        const { sub } = manageToken;
        const user = await this.userService.findIdRoleOnly(sub);
        if(!user){
            throw new UnauthorizedException('Invalid user!');
        }

        req.idUser = user.id;
        req.roleUser = user.role;
        return true;
    }
}