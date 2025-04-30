import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapingErrorIntegrationEvent } from '../../../google-scraper/application/integration-events/scraping-error.integration-event';
import { AnalysisRepository } from '../ports/analysis.repository';
import { GoogleScraperMetadata } from '../types';

@EventsHandler(ScrapingErrorIntegrationEvent)
export class ScrapingErrorEventHandler
  implements IEventHandler<ScrapingErrorIntegrationEvent>
{
  constructor(
    private readonly analysisRepository: AnalysisRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async handle(event: ScrapingErrorIntegrationEvent) {
    const { metadata } = event;
    const googleScraperMetadata = metadata as GoogleScraperMetadata;

    if (
      !googleScraperMetadata ||
      googleScraperMetadata.product !== 'serp-analyzer'
    )
      return;

    const analysis = await this.analysisRepository.findById(
      googleScraperMetadata.analysisId,
    );

    if (!analysis) return;

    this.eventPublisher.mergeObjectContext(analysis);
    analysis.markAsError();
    await this.analysisRepository.save(analysis);
    analysis.commit();
  }
}
