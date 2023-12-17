import { Controller, Get } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  getUserProfile(): string {
    return this.profileService.getUserProfile();
  }
}
