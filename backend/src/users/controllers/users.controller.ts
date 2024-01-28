import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { UserDTO } from '../dto/user.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';


@Controller('users')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(
    @Body() body: UserDTO
  ) {
    return this.usersService.createUser(body);
  }

  @AdminAccess()
  @Get('edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO
  ) {
    return this.usersService.updateUser(body, id);
  }

  @AdminAccess()
  @Get('delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.usersService.deleteUser(id);
  }

  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.usersService.findOneUser(id);
  }

  @PublicAccess()
  @Get('profile')
  public async findOwnProfile(@Request() request: Request) {
    return this.usersService.findOwnProfile(request);
  }

  @AdminAccess()
  @Roles('MODERATOR')
  @Get('list')
  public async findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
