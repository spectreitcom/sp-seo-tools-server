import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapingFinishedIntegrationEvent } from '../../../google-scraper/application/integration-events/scraping-finished.integration-event';
import { Logger } from '@nestjs/common';
import { GoogleScraperMetadata } from '../types';
import { AnalysisRepository } from '../ports/analysis.repository';
import { Page } from '../../domain/page';
import { GoogleScraperFacade } from '../../../google-scraper/application/google-scraper.facade';
import { PageFactory } from '../../domain/factories/page-factory';
import { stagesArray } from '../stages';
import { PageRepository } from '../ports/page.repository';
import { StageProcessingQueueService } from '../ports/stage-processing-queue.service';

@EventsHandler(ScrapingFinishedIntegrationEvent)
export class ScrapingFinishedEventHandler
  implements IEventHandler<ScrapingFinishedIntegrationEvent>
{
  private readonly logger = new Logger(ScrapingFinishedIntegrationEvent.name);

  constructor(
    private readonly analysisRepository: AnalysisRepository,
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly pageRepository: PageRepository,
    private readonly stageProcessingQueueService: StageProcessingQueueService,
  ) {}

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

    const analysis = await this.analysisRepository.findById(
      googleScraperMetadata.analysisId,
    );

    if (!analysis) return;

    const searchResults = await this.googleScraperFacade.getResults(
      analysis.getProcessId(),
    );

    if (!searchResults) return;

    const pages: Page[] = [];

    for (const searchResult of searchResults) {
      const page = PageFactory.create(
        searchResult.url,
        searchResult.position,
        analysis.getAnalysisId(),
        stagesArray,
      );
      pages.push(page);
    }
    await this.pageRepository.saveMany(pages);

    await this.stageProcessingQueueService.beginProcessing(
      pages.map((page) => page.getPageId()),
    );
  }
}
