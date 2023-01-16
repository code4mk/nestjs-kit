import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { AuthorizationMiddleware } from '@kitApp/middleware/authorization.middleware';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import EmailScheduleService from '@kitApp/schedule/email.schedule.service';
import databaseConfig from '@kitConfig/database.config';
import { database } from '@kitSetup/index';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Add all modules.
    UserModule,

    // Add config module.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [databaseConfig],
    }),
    // Add database.
    database(),
    // Add schedule module.
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // schedule service.
    EmailScheduleService,
  ],
})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('*');
  }
}
