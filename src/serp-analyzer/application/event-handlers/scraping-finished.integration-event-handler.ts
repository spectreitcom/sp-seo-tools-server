import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapingFinishedIntegrationEvent } from '../../../google-scraper/application/integration-events/scraping-finished.integration-event';
import { Logger } from '@nestjs/common';
import { GoogleScraperMetadata } from '../types';

@EventsHandler(ScrapingFinishedIntegrationEvent)
export class ScrapingFinishedIntegrationEventHandler
  implements IEventHandler<ScrapingFinishedIntegrationEvent>
{
  private readonly logger = new Logger(ScrapingFinishedIntegrationEvent.name);

  async handle(event: ScrapingFinishedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));
    const { metadata } = event;
    const googleScraperMetadata = metadata as GoogleScraperMetadata;

    if (
      !googleScraperMetadata ||
      googleScraperMetadata.product !== 'serp-analyzer' ||
      !googleScraperMetadata.analysisId
    ) {
      return;
    }
  }
}
