import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
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

    const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler()
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;

    if (accessLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          throw new UnauthorizedException('No tienes permisos para esta operacion.');
        }
      }
    }

    if (roleUser === ROLES.ADMIN || roleUser === ROLES.MODER) {
      return true;
    }

    const user = await this.userService.findOneUser(idUser);

    const userExistInPost = user.postsIncludes.find(
      (post) => post.post.id === req.params.postId
    );

    if (userExistInPost === undefined) {
      throw new UnauthorizedException('No formas parte del grupo editor.');
    }

    if (ACCESS_LEVEL[accessLevel] > userExistInPost.accessLevel) {
      throw new UnauthorizedException('No tienes el nivel de acceso necesario.');
    }

    return true;
  }
}
