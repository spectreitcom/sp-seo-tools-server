import { Injectable } from '@nestjs/common';
import { AnalysisProgressQueueService } from '../../application/ports/analysis-progress-queue.service';
import { AnalysisProgressProducer } from './producers/analysis-progress.producer';

@Injectable()
export class AppAnalysisProgressQueueService
  implements AnalysisProgressQueueService
{
  constructor(
    private readonly analysisProgressProducer: AnalysisProgressProducer,
  ) {}

  async incrementProgress(pageId: string): Promise<void> {
    await this.analysisProgressProducer.add(pageId);
  }
}
