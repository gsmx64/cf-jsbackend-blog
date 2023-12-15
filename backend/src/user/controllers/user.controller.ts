import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('say-hello')
  getHello(): string {
    return this.userService.getHello();
  }
}
