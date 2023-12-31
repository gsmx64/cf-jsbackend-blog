import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryDTO, CategoryUpdateDTO } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ){}

  public async createCategory(
    body: CategoryDTO
  ): Promise<CategoriesEntity> {
    try{
      return await this.categoryRepository.save(body);
    } catch(error){
      throw new Error(error);
    }
  }

  public async updateCategory(
    body: CategoryUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const category: UpdateResult = await this.categoryRepository.update(id, body);
      if(category.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async deleteCategory(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const category: DeleteResult = await this.categoryRepository.delete(id);
      if(category.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async findOneCategory(
    id: string
  ): Promise<CategoriesEntity> {
    try{
      return await this.categoryRepository
        .createQueryBuilder('category')
        .where({id})
        .getOne();
    } catch(error){
      throw new Error(error);
    }
  }

  public async findAllCategories(): Promise<CategoriesEntity[]> {
    try{
      return await this.categoryRepository.find();
    } catch(error){
      throw new Error(error);
    }
  }

}
