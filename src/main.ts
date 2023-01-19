import { NestFactory } from '@nestjs/core';
import { CentralExceptionFilter } from '@kitApp/exceptions/central.exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MessageFormatter } from 'class-validator-message-formatter';
import { AppModule } from './core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new CentralExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    disableErrorMessages: false,
    exceptionFactory: (validationErrors:any) => {
      let formattedMsg: any = MessageFormatter.format(validationErrors);
      return new BadRequestException(formattedMsg);
    },
  }));
  await app.listen(3000);
}
bootstrap();
