import { Injectable } from '@nestjs/common';
import { User } from '../types/User';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  testUser: User;

  constructor(private jwtService: JwtService) {
    this.testUser = {
      id: 10,
      username: 'admin',
      password: 'test',
    };
  }

  // TODO: Add DB
  validateUser(username: string, password: string): User {  //async  Promise<User>
    console.log('AuthService validateUser()');
    if (
      this.testUser.username.toLowerCase() == username.toLowerCase() &&
      this.testUser.password == password
    ) {
      return {
        id: this.testUser.id,
        username: this.testUser.username,
      };
    }
  }

  login(user: User) {  //async
    const payload = {
      name: user.username,
      id: user.id,
    };

    console.log(user, payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
