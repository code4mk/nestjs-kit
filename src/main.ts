import { NestFactory } from '@nestjs/core';
import { CentralExceptionFilter } from '@kitApp/exceptions/central.exception.filter';
import { AppModule } from './core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new CentralExceptionFilter());
  await app.listen(3000);
}
bootstrap();
