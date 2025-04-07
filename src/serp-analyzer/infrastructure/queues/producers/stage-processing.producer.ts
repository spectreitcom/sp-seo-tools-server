import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { STAGE_PROCESSING_QUEUE } from '../constants';

@Injectable()
export class StageProcessingProducer {
  constructor(
    @InjectQueue(STAGE_PROCESSING_QUEUE)
    private readonly queue: Queue,
  ) {}

  async add(stageId: string) {
    await this.queue.add('stage-processing', { stageId });
  }
}
