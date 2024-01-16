import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class LocalAccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException('No tienes permisos para esta operación.');
      }
    }

    if (
        roleUser === ROLES.ADMIN || 
        roleUser === ROLES.EDITOR ||
        roleUser === ROLES.MODERATOR
      ) {
      return true;
    }

    const user = await this.userService.findOneUser(idUser);

    const userExistInPost = user.posts.find(
      (posts) => posts.id === req.params.postId
    );

    if (userExistInPost === undefined) {
      throw new UnauthorizedException('No formas parte del grupo editor.');
    }

    return true;
  }
}
