import { UserService } from './../modules/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../modules/user/dto/create-dto-user';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() user: CreateUserDTO) {
    // console.log('!23');
    const userCreate = await this.authService.signUp(user);
    return {
      message: 'ok',
      data: userCreate,
    };
  }

  @Post('/sign-in')
  signIn(@Body() user: any) {
    return this.authService.signIn(user);
  }
}
