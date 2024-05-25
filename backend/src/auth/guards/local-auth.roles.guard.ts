import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from '../../constants/roles';
import { PUBLIC_KEY, ADMIN_KEY, ROLES_KEY } from '../../constants/key.decorators';

/**
 * A guard that checks the roles of the authenticated user to determine if they have permission to access a route.
 */
@Injectable()
export class LocalRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Determines if the user has permission to access the route.
   * @param context - The execution context.
   * @returns A boolean indicating if the user has permission to access the route.
   * @throws UnauthorizedException if the user does not have permission to access the route.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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

    const { roleUser } = req;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else if (roleUser === ROLES.MODERATOR) {
        return true;
      } else if (roleUser === ROLES.EDITOR) {
        return true;
      } else if (roleUser === ROLES.NONE) {
        return true; 
      } else {
        throw new UnauthorizedException('No permissions for this operation.');
      }
    }

    if(roleUser === ROLES.ADMIN) {
      return true
    } else if (roleUser === ROLES.MODERATOR) {
      return true;
    } else if (roleUser === ROLES.EDITOR) {
      return true;    
    }

    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) {
      throw new UnauthorizedException('No permissions for this operation.');
    }
    return true;
  }
}
