/**
 * Controller responsible for handling the settings related API endpoints.
 */
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { SettingsService } from '../services/settings.service';
import { SettingsUpdateDTO } from '../dto/settings.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';


/**
 * Controller responsible for handling settings operations.
 */
@ApiTags('Settings')
@Controller('settings')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

   /**
   * Update settings.
   * @param body - The updated settings data.
   * @returns The updated settings.
   */
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Put('edit')
  public async updateSettings(
    @Body() body: SettingsUpdateDTO
  ) {
    return this.settingsService.updateSettings(body);
  }

  /**
   * Retrieves settings.
   * @returns The settings.
   */
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('view')
  public async getSettings() {
    return this.settingsService.getSettings();
  }
}