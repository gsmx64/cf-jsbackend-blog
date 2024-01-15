import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToCommentDTO, UserToPostDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('users')
@UseGuards(LocalAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(
    @Body() body: UserDTO
  ) {
    return this.usersService.createUser(body);
  }

  @Post('userpost')
  public async userToPost(
    @Body() body: UserToPostDTO
  ) {
    return this.usersService.relationToPost(body);
  }

  @Post('usercomment')
  public async userToComment(
    @Body() body: UserToCommentDTO
  ) {
    return this.usersService.relationToComment(body);
  }

  @Get('edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO
  ) {
    return this.usersService.updateUser(body, id);
  }

  @Get('delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.usersService.deleteUser(id);
  }

  @PublicAccess()
  @Get('profile/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.usersService.findOneUser(id);
  }

  @Get('list')
  public async findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
