import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { DOMAIN_POSITION_PROCESSING_QUEUE } from '../constants';
import { Queue } from 'bullmq';

@Injectable()
export class DomainPositionProcessingProducer {
  constructor(
    @InjectQueue(DOMAIN_POSITION_PROCESSING_QUEUE)
    private readonly queue: Queue,
  ) {}

  async add() {
    await this.queue.add('domain-position-processing', null);
  }
}
