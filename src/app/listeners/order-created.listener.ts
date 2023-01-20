import { OrderCreateEvent } from '@kitApp/events/order-create.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderCreateListner {
  @OnEvent('order')
  handleOrderCreateEvent(event: OrderCreateEvent) {
    console.log(event.payload);
  }
}
