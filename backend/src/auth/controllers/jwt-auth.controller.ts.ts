import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';


@ApiTags('Auth-Jwt')
@Controller()
export class JwtAuthController {
  constructor(private authService: AuthService) {}
}