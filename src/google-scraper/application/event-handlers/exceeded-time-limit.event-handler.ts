import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExceededTimeLimitEvent } from '../../domain/events/exceeded-time-limit.event';
import { Logger } from '@nestjs/common';
import { ScrapingErrorIntegrationEvent } from '../integration-events/scraping-error.integration-event';

@EventsHandler(ExceededTimeLimitEvent)
export class ExceededTimeLimitEventHandler
  implements IEventHandler<ExceededTimeLimitEvent>
{
  private readonly logger = new Logger(ExceededTimeLimitEvent.name);

  constructor(private readonly eventBus: EventBus) {}

  async handle(event: ExceededTimeLimitEvent) {
    this.logger.debug(JSON.stringify(event));
    const { processId, metadata } = event;
    this.eventBus.publish(
      new ScrapingErrorIntegrationEvent(processId, metadata),
    );
  }
}
