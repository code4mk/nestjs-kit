import { NestFactory } from '@nestjs/core';
import { CentralExceptionFilter } from '@kitApp/exceptions/central.exception.filter';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { MessageFormatter } from 'class-validator-message-formatter';
import helmet from 'helmet';
import { AppModule } from './core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
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

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  await app.listen(3000);
}
bootstrap();
