import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AnalysisFinishedEvent } from '../../domain/events/analysis-finished.event';
import { Logger } from '@nestjs/common';

@EventsHandler(AnalysisFinishedEvent)
export class AnalysisFinishedEventHandler
  implements IEventHandler<AnalysisFinishedEvent>
{
  private readonly logger = new Logger(AnalysisFinishedEvent.name);

  async handle(event: AnalysisFinishedEvent) {
    this.logger.debug(JSON.stringify(event));
  }
}
