import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { CentralExceptionFilter } from './core/central.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new CentralExceptionFilter());
  await app.listen(3000);
}
bootstrap();
