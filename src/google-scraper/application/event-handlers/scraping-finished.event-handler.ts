import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapingFinishedEvent } from '../../domain/events/scraping-finished.event';
import { Logger } from '@nestjs/common';
import { ScrapingFinishedIntegrationEvent } from '../integration-events/scraping-finished.integration-event';
import { SearchResult } from '../types';

@EventsHandler(ScrapingFinishedEvent)
export class ScrapingFinishedEventHandler
  implements IEventHandler<ScrapingFinishedEvent>
{
  private readonly logger = new Logger(ScrapingFinishedEvent.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: ScrapingFinishedEvent) {
    this.logger.debug(JSON.stringify(event));
    const {
      metadata,
      localizationCode,
      resultsNumber,
      results,
      query,
      processId,
      device,
    } = event;

    const resultsArray: SearchResult[] = [];

    for (let i = 0; i < resultsNumber; i++) {
      const result = results?.organic?.[i];
      if (result) {
        resultsArray.push({
          url: result.link,
          position: result.rank,
        });
      }
    }

    this.eventBus.publish(
      new ScrapingFinishedIntegrationEvent(
        processId,
        metadata,
        resultsArray,
        localizationCode,
        resultsNumber,
        query,
        device,
      ),
    );
  }
}
