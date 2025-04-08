import { Processor, WorkerHost } from '@nestjs/bullmq';
import { STAGE_PROCESSING_QUEUE } from '../constants';
import { Job } from 'bullmq';
import { EventBus } from '@nestjs/cqrs';
import { StageProcessingFinishedEvent } from '../../events/stage-processing-finished.event';
import { StageRepository } from '../../../application/ports/stage.repository';
import {
  HTML_STRUCTURE_STAGE,
  PAGE_SPEED_STAGE,
} from '../../../application/stages';

@Processor(STAGE_PROCESSING_QUEUE, {
  concurrency: 2,
})
export class StageProcessingConsumer extends WorkerHost {
  constructor(
    private readonly eventBus: EventBus,
    private readonly stageRepository: StageRepository,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const stageId = job.data.stageId;
    const stage = await this.stageRepository.findById(stageId);
    console.log('Processing stage:', stageId); // todo;
    if (!stage) return;

    switch (stage.getStage()) {
      case HTML_STRUCTURE_STAGE:
        break;
      case PAGE_SPEED_STAGE:
        break;
    }

    this.eventBus.publish(new StageProcessingFinishedEvent(stageId));
  }
}
