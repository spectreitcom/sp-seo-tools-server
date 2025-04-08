import { Injectable } from '@nestjs/common';
import { StageProcessingQueueService } from '../../application/ports/stage-processing-queue.service';
import { StageProcessingProducer } from './producers/stage-processing.producer';
import { StageRepository } from '../../application/ports/stage.repository';

@Injectable()
export class AppStageProcessingQueueService
  implements StageProcessingQueueService
{
  constructor(
    private readonly stageProcessingProducer: StageProcessingProducer,
    private readonly stageRepository: StageRepository,
  ) {}

  async beginProcessing(pageIds: string[]): Promise<void> {
    const stages = await this.stageRepository.findAllCreated(pageIds);

    for (const stage of stages) {
      await this.stageProcessingProducer.add(stage.getStageId());
    }
  }
}
