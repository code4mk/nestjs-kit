import {
  Controller, Get, HttpStatus, BadRequestException, UnprocessableEntityException, Req, Res, HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(@Req() req: Request, @Res() res: Response) {
    try {
      let user: any = await this.userService.getHello();
      res.status(200).json(user);
    } catch (error) {
      throw new HttpException('error', 404);
    }
  }
}
