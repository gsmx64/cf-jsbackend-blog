import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CategoriesService } from './categories.service';
import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryCreateDTO } from '../dto/category.create.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publish.status';
import { UsersService } from '../../users/services/users.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<CategoriesEntity>;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        UsersService,
        {
          provide: getRepositoryToken(CategoriesEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<CategoriesEntity>>(
      getRepositoryToken(CategoriesEntity)
    );
    userService = module.get<UsersService>(UsersService);
  });

  describe('createCategory', () => {
    it('should create a category and return it', async () => {
      const body: CategoryCreateDTO = {
        title: 'Testing',
        description: 'Testing description.',
        image: 'https://getlorem.com/static/images/cicero2.jpg',
        status: PUBLISH_STATUS.UNPUBLISHED,
        author: '',
        posts: []
    };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(body as CategoriesEntity);

      const result = await service.createCategory(body);

      expect(result).toEqual(body as CategoriesEntity);
      expect(repository.save).toHaveBeenCalledWith({
        ...body,
        status: 'UNPUBLISHED',
      });
    });

    it('should throw an error if category creation fails', async () => {
      const body: CategoryCreateDTO = {
        title: 'Testing',
        description: 'Testing description.',
        image: 'https://getlorem.com/static/images/cicero2.jpg',
        status: PUBLISH_STATUS.PUBLISHED,
        author: '',
        posts: []
    };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(undefined);

      await expect(service.createCategory(body)).rejects.toThrow(
        ErrorManager
      );
      expect(repository.save).toHaveBeenCalledWith({
        ...body,
        status: 'UNPUBLISHED',
      });
    });
  });

  describe('updateCategory', () => {
    it('should update a category and return the result', async () => {
      const body: CategoryUpdateDTO = { title: 'Updated' };
      const id = '1';

      const updateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult);

      const result = await service.updateCategory(body, id);

      expect(result).toEqual(updateResult);
      expect(repository.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an error if category update fails', async () => {
      const body: CategoryUpdateDTO = { title: 'Updated' };
      const id = '1';

      const updateResult: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 0,
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult);

      await expect(service.updateCategory(body, id)).rejects.toThrow(
        ErrorManager
      );
      expect(repository.update).toHaveBeenCalledWith(id, body);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category and return the result', async () => {
      const id = '1';

      const deleteResult: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(repository, 'delete').mockResolvedValueOnce(deleteResult);

      const result = await service.deleteCategory(id);

      expect(result).toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if category deletion fails', async () => {
      const id = '1';

      const deleteResult: DeleteResult = {
        raw: [],
        affected: 0,
      };

      jest.spyOn(repository, 'delete').mockResolvedValueOnce(deleteResult);

      await expect(service.deleteCategory(id)).rejects.toThrow(ErrorManager);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  // Additional tests for other methods in the CategoriesService class
});
