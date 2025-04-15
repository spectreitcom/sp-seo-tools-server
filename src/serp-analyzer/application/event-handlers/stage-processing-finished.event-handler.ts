import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StageProcessingFinishedEvent } from '../../infrastructure/events/stage-processing-finished.event';
import { Logger } from '@nestjs/common';
import { StageRepository } from '../ports/stage.repository';
import { AnalysisProgressQueueService } from '../ports/analysis-progress-queue.service';

@EventsHandler(StageProcessingFinishedEvent)
export class StageProcessingFinishedEventHandler
  implements IEventHandler<StageProcessingFinishedEvent>
{
  private readonly logger = new Logger(StageProcessingFinishedEvent.name);

  constructor(
    private readonly stageRepository: StageRepository,
    private readonly analysisProgressQueueService: AnalysisProgressQueueService,
  ) {}

  async handle(event: StageProcessingFinishedEvent) {
    this.logger.debug(JSON.stringify(event));
    const { stageId } = event;
    const stage = await this.stageRepository.findById(stageId);
    stage.complete();
    await this.stageRepository.save(stage);
    await this.analysisProgressQueueService.incrementProgress(
      stage.getPageId(),
    );
  }
}
