import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { TESTING_MODE_CHECKER_QUEUE } from '../constants';
import { Queue } from 'bullmq';

@Injectable()
export class TestingModeCheckerProducer {
  constructor(
    @InjectQueue(TESTING_MODE_CHECKER_QUEUE) private readonly queue: Queue,
  ) {}

  async add() {
    await this.queue.add('testing-mode-checker', null);
  }
}
