import { Injectable, Logger } from '@nestjs/common';
import { TestDto } from './dto/request.dto';
import { isMainThread, Worker } from 'worker_threads';
import { Cron } from '@nestjs/schedule';
import worker_path from './worker/config';

@Injectable()
export class TestService {
  private queue: TestDto[] = [];
  private readonly logger = new Logger(TestService.name);

  registerRequests(data: TestDto): number {
    this.queue.push(data);
    this.logger.log(`New request accepted: ${data.name}`);
    return this.queue.length;
  }

  @Cron('0 * * * * *')
  handleCron() {
    this.logger.debug('Called in every minute');
    const data = this.queue?.[0];
    // Create worker thread
    if (data && isMainThread) {
      const worker = new Worker(worker_path, {
        workerData: {
          data,
        },
      });

      worker.on('message', (data: TestDto) => {
        // Remove processed request from queue
        this.queue = this.queue.filter((item) => item.id !== data.id);
        this.logger.log(`Request removed from queue: ${data.id}`);
      });

      worker.on('error', (e) => {
        this.logger.error('Worker error ' + e.stack);
      });
      worker.on('exit', (code) => {
        this.logger.warn('Worker exit ' + code);
      });
    }
  }
}
