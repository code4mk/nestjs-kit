import {
  OnQueueActive, Process, Processor, InjectQueue, OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor({ name: 'verify-email' })
export class VerifyEmailProcessor {
  constructor() {}
  @Process({ name: 'verify-email' })
  async onProcess(job: Job) {
    // console.log('what');
    // console.log(job.data);
    return {};
  }

  @OnQueueActive()
  async onActive(job: Job) {
    // await this.theQueue.on('error', (err) => console.log(err));
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`,
    );
    return {};
  }
}
