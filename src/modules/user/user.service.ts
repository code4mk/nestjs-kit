import {
  BadRequestException,
  HttpException, Injectable, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async getUsers(req: Request) {
    let perPage: any = req.query?.per_page || 5;
    let thePage: any = req.query?.page || 1;

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
      let qb: any = this.usersRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.firstName']);

      return paginate<User>(qb, { page: thePage, limit: perPage, route: 'abc.com/a' });
    } catch (error) {
      let data: any = error;
      throw new BadRequestException({ data });
    }
  }
}
