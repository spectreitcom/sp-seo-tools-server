import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { TESTING_MODE_CHECKER_QUEUE } from '../constants';

@Injectable()
export class TestingModeCheckerProducer {
  constructor(
    @InjectQueue(TESTING_MODE_CHECKER_QUEUE) private readonly queue: Queue,
  ) {}

  async add() {
    await this.queue.add('testing-mode-checker', null);
  }
}
