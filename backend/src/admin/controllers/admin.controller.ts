import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AdminService } from '../services/admin.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';


@Controller('admin')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AdminAccess()
  @Get('users/edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO
  ) {
    return this.adminService.updateUser(body, id);
  }

  @AdminAccess()
  @Get('users/delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.adminService.deleteUser(id);
  }

  @AdminAccess()
  @Get('users/view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.adminService.findOneUser(id);
  }

  @AdminAccess()
  @Get('users/profile')
  public async findOwnProfile(@Request() request: Request) {
    return this.adminService.findOwnProfile(request);
  }

  @AdminAccess()
  @Get('users/list')
  public async findAllUsers() {
    return this.adminService.findAllUsers();
  }

  @AdminAccess()
  @Get('categories/edit/:id')
  public async updateCategory(
    @Param('id') id: string, 
    @Body() body: CategoryUpdateDTO
  ) {
    return this.adminService.updateCategory(body, id);
  }

  @AdminAccess()
  @Get('categories/delete/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.adminService.deleteCategory(id);
  }

  @AdminAccess()
  @Get('categories/view/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.adminService.findOneCategory(id);
  }

  @AdminAccess()
  @Get('categories/list')
  public async findAllCategories() {
    return this.adminService.findAllCategories();
  }

  @AdminAccess()
  @Get('posts/edit/:id')
  public async updatePost(
    @Param('id') id: string, 
    @Body() body: PostUpdateDTO
  ) {
    return this.adminService.updatePost(body, id);
  }

  @AdminAccess()
  @Get('posts/delete/:id')
  public async deletePost(
    @Param('id') id: string
  ) {
    return this.adminService.deletePost(id);
  }

  @AdminAccess()
  @Get('posts/view/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.adminService.findOnePost(id);
  }

  @AdminAccess()
  @Get('posts/list')
  public async findAllPosts() {
    return this.adminService.findAllPosts();
  }
}
