import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CentralExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof UnprocessableEntityException) {
      // response
      //   .status(status)
      //   .json(exception);
    } else {
      //
    }

    let theResponse: any = exception.getResponse();
    let responseData: any = {
      ...theResponse,
      path: request.url,
    };
    response.status(status).json(responseData);
  }
}
