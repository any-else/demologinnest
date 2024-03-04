import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../modules/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(user): Promise<any> {
    const check = await this.userService.getOne(user.email);
    // console.log(check, '22');
    if (check) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const hasdPassword = await argon2.hash(user.password);
    // user.password = hasdPassword;
    const newUser = {
      ...user,
      password: hasdPassword,
    };
    return this.userService.create(newUser);
  }
  async signIn(user) {
    const check = await this.userService.getOne(user.email);
    console.log(check, '22');
    if (!check) {
      throw new HttpException('Email không tồn tại', HttpStatus.BAD_REQUEST);

    }
    const checkPassword = await argon2.verify(check.password, user.password);
    if (!checkPassword) {
      throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'Đăng nhập thành công',
      data: check,
    };
  }
}
