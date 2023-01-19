import {
  BadRequestException,
  Body,
  Injectable,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async getUsers(req: Request) {
    let perPage: any = req.query?.perPage || req.query?.limit || 5;
    let thePage: any = req.query?.page || 1;
    let theRoute: any = `${req.protocol}://${req.get('host')}${req.path}`;

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

      return paginate<User>(qb, { page: thePage, limit: perPage, route: theRoute });
    } catch (error) {
      let data: any = error;
      throw new BadRequestException({ data });
    }
  }

  async addUser(createUserDto: any) {
    let { firstName, lastName } = createUserDto;
    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          { firstName, lastName },
        ])
        .execute();
      return ('user is created');
    } catch (error) {
      return error;
    }
  }
}
