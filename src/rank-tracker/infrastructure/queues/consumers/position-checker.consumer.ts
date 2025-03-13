import { Processor, WorkerHost } from '@nestjs/bullmq';
import { POSITION_CHECKER_QUEUE } from '../constants';
import { PositionChecker } from '../position-checker';
import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { UserSubscriptionInfoRepository } from '../../../application/ports/user-subscription-info.repository';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { DomainPosition } from '../../../domain/domain-position';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { GoogleScraperFacade } from '../../../../google-scraper/application/google-scraper.facade';
import { SearchResult } from '../../types';
import { TestingModeRepository } from '../../../application/ports/testing-mode.repository';

const TAKE = 100;

@Processor(POSITION_CHECKER_QUEUE)
export class PositionCheckerConsumer extends WorkerHost {
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly domainRepository: DomainRepository,
    private readonly localizationRepository: LocalizationRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly domainPositionRepository: DomainPositionRepository,
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly testingModeRepository: TestingModeRepository,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;

    let keywords = await this.keywordRepository.findAll(TAKE, skip);

    while (!!keywords.length) {
      for (const keyword of keywords) {
        const domain = await this.domainRepository.findById(
          keyword.getDomainId(),
        );

        const localization = await this.localizationRepository.findById(
          keyword.getLocalizationId(),
        );

        const userSubscriptionInfo =
          await this.userSubscriptionInfoRepository.findByUser(domain.userId);

        const testingMode = await this.testingModeRepository.findByUserId(
          domain.userId,
        );

        if (testingMode && testingMode.getActive()) {
          const searchResults = await this.googleScraperFacade.getResults(
            localization.countryCode,
            testingMode.getMaxSearchedPages() * 10 + 1,
            keyword.getKeywordText(),
          );

          await this.processSearchResults(
            searchResults,
            domain.text,
            keyword.getKeywordId(),
          );

          continue;
        }

        if (userSubscriptionInfo && userSubscriptionInfo.getActive()) {
          const searchResults = await this.googleScraperFacade.getResults(
            localization.countryCode,
            userSubscriptionInfo.getMaxSearchedPages() * 10 + 1,
            keyword.getKeywordText(),
          );

          await this.processSearchResults(
            searchResults,
            domain.text,
            keyword.getKeywordId(),
          );
        }
      }

      skip = TAKE * (skip + 1);
      keywords = await this.keywordRepository.findAll(TAKE, skip);
    }
  }

  private async processSearchResults(
    searchResults: SearchResult[],
    domain: string,
    keywordId: string,
  ) {
    const position = PositionChecker.getHighestPosition(searchResults, domain);

    const domainPosition = new DomainPosition(
      randomUUID(),
      keywordId,
      position === -1 ? 0 : position,
      moment().unix(),
    );

    await this.domainPositionRepository.save(domainPosition);
  }
}
