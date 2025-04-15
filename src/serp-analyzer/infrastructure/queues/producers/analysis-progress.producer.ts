import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { ANALYSIS_PROGRESS_QUEUE } from '../constants';
import { Queue } from 'bullmq';

@Injectable()
export class AnalysisProgressProducer {
  constructor(
    @InjectQueue(ANALYSIS_PROGRESS_QUEUE)
    private readonly queue: Queue,
  ) {}

  async add(pageId: string) {
    await this.queue.add('analysis-progress', { pageId });
  }
}
