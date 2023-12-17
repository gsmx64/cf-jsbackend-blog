import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsersList(): string {
    return 'Hello World Users!';
  }
}
