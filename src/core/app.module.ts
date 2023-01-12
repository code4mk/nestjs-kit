import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { AuthorizationMiddleware } from '@kitApp/middleware/authorization.middleware';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // modules
    UserModule,

    // config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('*');
  }
}
