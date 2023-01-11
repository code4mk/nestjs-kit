import {
  Controller, Get, HttpStatus, BadRequestException, UnprocessableEntityException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // let error: any = [{ error: [{ a: 21 }] }];
    // throw new UnprocessableEntityException(error);
    return this.appService.getHello();
  }
}
