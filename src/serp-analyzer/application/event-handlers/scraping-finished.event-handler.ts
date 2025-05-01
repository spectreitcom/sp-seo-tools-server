import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapingFinishedIntegrationEvent } from '../../../google-scraper/application/integration-events/scraping-finished.integration-event';
import { Logger } from '@nestjs/common';
import { GoogleScraperMetadata } from '../types';
import { AnalysisRepository } from '../ports/analysis.repository';
import { Page } from '../../domain/page';
import { GoogleScraperFacade } from '../../../google-scraper/application/google-scraper.facade';
import { PageFactory } from '../../domain/factories/page-factory';
import { stagesArray } from '../../infrastructure/stages';
import { PageRepository } from '../ports/page.repository';
import { StageProcessingQueueService } from '../ports/stage-processing-queue.service';
import { HtmlService } from '../ports/html.service';
import { AnalysisProgressRepository } from '../ports/analysis-progress.repository';
import { AnalysisProgressFactory } from '../../domain/factories/analysis-progress.factory';

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
    private readonly htmlService: HtmlService,
    private readonly analysisProgressRepository: AnalysisProgressRepository,
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
      const { html, status } = await this.htmlService.fromUrl(searchResult.url);

      const page = PageFactory.create(
        searchResult.url,
        searchResult.position,
        analysis.getAnalysisId(),
        stagesArray,
        html,
      );

      if (status >= 400) {
        page.setError(`Failed to fetch HTML`);
      }

      pages.push(page);
    }
    await this.pageRepository.saveMany(pages);

    const totalProgress = stagesArray.length * pages.length;
    const analysisProgress = AnalysisProgressFactory.create(
      analysis.getAnalysisId(),
      totalProgress,
    );
    await this.analysisProgressRepository.save(analysisProgress);

    await this.stageProcessingQueueService.beginProcessing(
      pages.map((page) => page.getPageId()),
    );
  }
}
