import {
  BadRequestException,
  HttpException, Injectable, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async getHello() {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          { firstName: 'kamal', lastName: 'mostafa' },
        ])
        .execute();
    } catch (error) {
      let data: any = error;
      throw new BadRequestException({ data });
    }

    try {
      let a = await this.usersRepository.find();
      console.log(a);
      return a;
    } catch (error) {
      let data: any = error;
      throw new BadRequestException({ data });
    }
  }
}
