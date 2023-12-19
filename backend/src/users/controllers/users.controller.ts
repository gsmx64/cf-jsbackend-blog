import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('say-hello')
  getUsersList(): string {
    return this.usersService.getUsersList();
  }

  @Get('profile')
  getUserProfile(): string {
    return this.usersService.getUserProfile();
  }
}
