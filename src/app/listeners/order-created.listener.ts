import { OrderCreateEvent } from '@kitApp/events/order-create.event';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import * as ms from 'milliseconds';

@Injectable()
export class OrderCreateListner {
  constructor(@InjectQueue('verify-email') private readonly theQueue: Queue) {}
  @OnEvent('order')
  async handleOrderCreateEvent(event: OrderCreateEvent) {
    console.log('event-triggered');
    // console.log(event.payload);
    await this.theQueue.add('verify-email', {
      ...event.payload,
    }, {
      delay: ms.seconds(10),
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
