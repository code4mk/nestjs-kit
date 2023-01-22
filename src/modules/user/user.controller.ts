import { MailerService } from '@nestjs-modules/mailer';
import {
  Controller, Get, Post, Req, Res, HttpException, Body, Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getResponse } from 'src/utils/get-response';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) { }

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

  @Get('/mail')
  async mail() {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        context: {
          name: 'nestjskit',
        },
        // html: '<b>welcome</b>', // HTML body content
        template: 'email',
      })
      .then((r) => { console.log(r); })
      .catch((e) => { console.log(e); });
    return 'sent';
  }
}
