import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AnalysisCreatedEvent } from '../../domain/events/analysis-created.event';
import { Logger } from '@nestjs/common';
import { GoogleScraperFacade } from '../../../google-scraper/application/google-scraper.facade';
import { LocalizationRepository } from '../ports/localization.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { GoogleScraperMetadata } from '../types';
import { AnalysisRepository } from '../ports/analysis.repository';

@EventsHandler(AnalysisCreatedEvent)
export class AnalysisCreatedEventHandler
  implements IEventHandler<AnalysisCreatedEvent>
{
  private readonly logger = new Logger(AnalysisCreatedEvent.name);

  constructor(
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly localizationRepository: LocalizationRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async handle(event: AnalysisCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
    const { analysisId } = event;

    const analysis = await this.analysisRepository.findById(analysisId);

    if (!analysis) return;

    const metadata: GoogleScraperMetadata = {
      analysisId,
      userId: analysis.getUserId(),
      product: 'serp-analyzer',
    };

    const localization = await this.localizationRepository.findById(
      analysis.getLocalizationId(),
    );

    if (!localization) return;

    const testingMode = await this.testingModeRepository.findByUser(
      analysis.getUserId(),
    );
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(
        analysis.getUserId(),
      );

    if (userSubscriptionInfo && userSubscriptionInfo.getActive()) {
      const { response_id } = await this.googleScraperFacade.sendQuery(
        localization.getCountryCode(),
        userSubscriptionInfo.getSearchedPages() * 10,
        analysis.getKeyword(),
        analysis.getDevice(),
        analysis.getUserId(),
        metadata,
      );

      this.eventPublisher.mergeObjectContext(analysis);
      analysis.updateProcessId(response_id);
      await this.analysisRepository.save(analysis);
      analysis.commit();
    }

    if (testingMode && testingMode.getActive()) {
      const { response_id } = await this.googleScraperFacade.sendQuery(
        localization.getCountryCode(),
        testingMode.getSearchedPages() * 10,
        analysis.getKeyword(),
        analysis.getDevice(),
        analysis.getUserId(),
        metadata,
      );

      this.eventPublisher.mergeObjectContext(analysis);
      analysis.updateProcessId(response_id);
      await this.analysisRepository.save(analysis);
      analysis.commit();
    }
  }
}
