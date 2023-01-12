import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export default class EmailScheduleService {
  @Cron(CronExpression.EVERY_5_MINUTES, {
    name: 'email-schedule',
  })
  triggerNotification() {
    // TODO: desired implementation.
    console.log('email scheduling');
  }
}
