import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getUserProfile(): string {
    return 'Hello World User Profile!';
  }
}
