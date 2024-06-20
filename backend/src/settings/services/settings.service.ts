/**
 * Service responsible for handling settings operations.
 */
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SqlReader } from 'node-sql-reader';
import * as path from 'path';

import { SettingsEntity } from '../entities/settings.entity';
import { SettingsUpdateDTO } from '../dto/settings.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersService } from '../../users/services/users.service';
import { TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { LoggingMessages } from '../../utils/logging.messages';
import { AuthService } from '../../auth/services/auth.service';
import { AppDS } from '../../config/data.source';
import { PostsEntity } from '../../posts/entities/posts.entity';


/**
 * Service class for handling settings operations.
 */
@Injectable()
export class SettingsService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,

    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,

    private authService: AuthService,
    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);

    const settings_check: any = this.settingsRepository
        .createQueryBuilder('settings')
        .where('settings.id = :Id', { Id: 1 })
        .getOne();

      if(!settings_check) {
        this.settingsRepository.query(`BEGIN;INSERT INTO "public"."settings" ("id","activation") VALUES ("1", "auto");COMMIT;`);
      }
  }

  /**
   * Updates settings.
   * @param body - The updated settings data.
   * @returns The update result.
   */
  public async updateSettings(
    body: SettingsUpdateDTO
  ): Promise<UpdateResult | undefined>{
    try{
      const settings: UpdateResult = await this.settingsRepository.update(1, body);

      if(settings.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No changes made while updating the settings.'
        });
      }

      LoggingMessages.log(settings, 'SettingsService.updateSettings(body) -> settings', this.dataForLog);
      return settings;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Returns settings data.
   * @returns The settings.
   */
  public async getSettings(): Promise<SettingsEntity> {
    try{
      const settings: SettingsEntity = await this.settingsRepository
        .createQueryBuilder('settings')
        .where('settings.id = :Id', { Id: 1 })
        .getOne();

      if(!settings) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Settings not found.'
        });
      }

      LoggingMessages.log(settings, 'SettingsService.getSettings() -> settings', this.dataForLog);
      return settings;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Returns settings data.
   * @returns The settings.
   */
  public async loadSampleData(sample: string): Promise<string> {
    try {
      if(sample !== 'install_sample_data') {
        return;
      }

      const post: PostsEntity = await this.postRepository
        .createQueryBuilder('post')
        .where({id: 'cd524607-d326-4afe-8815-4f8796b4a8d0'})
        .getOne();
  
      if(!post) {
        const appDataSource = await AppDS.initialize();
        const queryRunner = appDataSource.createQueryRunner();
    
        const queries = SqlReader.readSqlFile(path.join(__dirname, "../../utils/sample_data.sql"))
        for (let query of queries) {
          queryRunner.manager.query(query);
        }
    
        return 'Sampla data was loaded successfully!';
      } else {
        return 'Sampla data already loaded!';
      }
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
