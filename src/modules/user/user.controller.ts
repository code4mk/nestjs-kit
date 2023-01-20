import {
  Controller, Get, Post, Req, Res, HttpException, Body, Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getResponse } from 'src/utils/get-response';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Req() req: Request, @Res() res: Response) {
    try {
      let user: any = await this.userService.getUsers(req);
      let data: any = getResponse(true, 'user retrive', user);
      res.status(200).json(data);
    } catch (error) {
      throw new HttpException('error', 404);
    }
  }

  @Post('/add-user')
  async addUser(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res() res: Response) {
    try {
      let user: any = await this.userService.addUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      throw new HttpException('error', 404);
    }
  }

  @Get('/order')
  async order(@Req() req: Request, @Res() res: Response) {
    let a: any = await this.userService.order();
    res.json('order event listener');
  }
}
