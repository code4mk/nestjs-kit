import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCreateListner } from '@kitApp/listeners/order-created.listener';
import { VerifyEmailProcessor } from '@kitApp/jobs/verify-email.process';
import { BullModule } from '@nestjs/bull';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'verify-email',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, OrderCreateListner, VerifyEmailProcessor],
  exports: [TypeOrmModule, BullModule],
})
export class UserModule {}
