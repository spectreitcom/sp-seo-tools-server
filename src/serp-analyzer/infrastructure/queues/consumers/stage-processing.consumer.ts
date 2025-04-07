import { Processor, WorkerHost } from '@nestjs/bullmq';
import { STAGE_PROCESSING_QUEUE } from '../constants';
import { Job } from 'bullmq';
import { EventBus } from '@nestjs/cqrs';
import { StageProcessingFinishedEvent } from '../../events/stage-processing-finished.event';

@Processor(STAGE_PROCESSING_QUEUE)
export class StageProcessingConsumer extends WorkerHost {
  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async process(job: Job): Promise<void> {
    const stageId = job.data.stageId;
    console.log(stageId);
    this.eventBus.publish(new StageProcessingFinishedEvent(stageId));
  }
}
