import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
