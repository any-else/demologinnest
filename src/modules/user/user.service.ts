import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  getAll(): Promise<any> {
    return this.userRepository.find();
  }
   getOne(email : string): Promise<any> {
    return this.userRepository.findOne(
      {where : {email : email}}
    );
  }

  create(dataUser): Promise<any> {
    const newUser = this.userRepository.create(dataUser);
    return this.userRepository.save(newUser);
  }
}
