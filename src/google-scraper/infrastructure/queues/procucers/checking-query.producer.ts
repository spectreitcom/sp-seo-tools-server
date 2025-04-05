import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { CHECKING_QUERY_QUEUE } from '../constants';

@Injectable()
export class CheckingQueryProducer {
  constructor(
    @InjectQueue(CHECKING_QUERY_QUEUE) private readonly queue: Queue,
  ) {}

  async add() {
    await this.queue.add('checking-query', null);
  }
}
