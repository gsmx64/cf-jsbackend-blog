import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsersList(): string {
    return 'Hello World Users!';
  }

  getUserProfile(): string {
    return 'Hello World User Profile!';
  }
}
