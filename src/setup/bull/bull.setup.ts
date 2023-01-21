import { BullModule } from '@nestjs/bull';
import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';

declare let process : {
  env: any
};

dotenv.config();
let client: any;
let subscriber: any;

let redisConnectionOpts: any = {
  host: process.env?.REDIS_HOST || '',
  port: process.env?.REDIS_PORT || 6379,
  username: process.env?.REDIS_USERNAME || '',
  password: process.env?.REDIS_PASSWORD || '',
};

if (!client) {
  client = new Redis({ ...redisConnectionOpts }, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
}

if (!subscriber) {
  subscriber = new Redis({ ...redisConnectionOpts }, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
}

export function bull() {
  return BullModule.forRoot({
    // Reusing redis connection.
    // HINTS: https://docs.bullmq.io/bull/patterns/reusing-redis-connections
    createClient(type: any, redisOpts: any) {
      switch (type) {
        case 'client':
          console.log(process.env.REDIS_HOST);
          return client;
        case 'subscriber':
          return subscriber;
        case 'bclient':
          return new Redis({ ...redisConnectionOpts }, {
            ...redisOpts,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
          });
        default:
          throw new Error(`Unexpected connection type: ${type}`);
      }
    },
  });
}
