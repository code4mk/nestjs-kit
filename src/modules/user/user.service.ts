import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): any {
    try {
      let output: any = {
        project: 'nestjs',
      };
      return output;
    } catch (error) {
      let data: any = [{ error: [{ a: 22 }] }];
      throw new UnprocessableEntityException(data);
    }
  }
}
