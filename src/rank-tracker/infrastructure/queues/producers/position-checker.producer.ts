import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { POSITION_CHECKER_QUEUE } from '../constants';

@Injectable()
export class PositionCheckerProducer {
  constructor(
    @InjectQueue(POSITION_CHECKER_QUEUE)
    private readonly queue: Queue,
  ) {}

  async add() {
    await this.queue.add('position-checker', null);
  }
}
