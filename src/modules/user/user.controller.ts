import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-dto-user';
import { GetListInterceptor } from './interceptor/get.list.interceptor';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  @UseInterceptors(GetListInterceptor)
  async getAllUser() {
    const userList = await this.userService.getAll();
    return userList;
  }
  @Post('create')
  async createUser(@Body() user: CreateUserDTO) {
    const newUser = await this.userService.create(user);
    return {
      message: 'tạo mới thành cong',
    };
  }
}
