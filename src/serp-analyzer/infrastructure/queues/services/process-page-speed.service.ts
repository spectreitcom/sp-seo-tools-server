import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { StageProcessingFinishedEvent } from '../../events/stage-processing-finished.event';
import { Stage } from '../../../domain/stage';
import { StageRepository } from '../../../application/ports/stage.repository';

@Injectable()
export class ProcessPageSpeedService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly stageRepository: StageRepository,
  ) {}

  async process(stage: Stage): Promise<void> {
    stage.makeInProgress();
    await this.stageRepository.save(stage);
    this.eventBus.publish(new StageProcessingFinishedEvent(stage.getStageId()));
  }
}
