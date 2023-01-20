export class OrderCreateEvent {
  payload: {[key: string]: any};
  constructor(payload?: {[key: string]: any}) {
    this.payload = payload;
  }
}
