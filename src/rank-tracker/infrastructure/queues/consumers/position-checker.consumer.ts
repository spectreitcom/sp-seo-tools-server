import { Processor, WorkerHost } from '@nestjs/bullmq';
import { POSITION_CHECKER_QUEUE } from '../constants';
import { SerpapiClient } from '../../serpapi/serpapi.client';
import { ScrapeStrategy } from '../../serpapi/strategies/scrape-strategy';
import { SearchResult } from '../../serpapi/types';
import { PositionChecker } from '../position-checker';
import { ScrapeStrategyFactory } from '../../serpapi/factories/scrape-strategy.factory';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { SearchEngineRepository } from '../../../application/ports/search-engine.repository';
import { UserSubscriptionInfoRepository } from '../../../application/ports/user-subscription-info.repository';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { DomainPosition } from '../../../domain/domain-position';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

const TAKE = 100;

@Processor(POSITION_CHECKER_QUEUE)
export class PositionCheckerConsumer extends WorkerHost {
  constructor(
    private readonly serpapiClient: SerpapiClient,
    private readonly configService: ConfigService,
    private readonly http: HttpService,
    private readonly keywordRepository: KeywordRepository,
    private readonly domainRepository: DomainRepository,
    private readonly localizationRepository: LocalizationRepository,
    private readonly searchEngineRepository: SearchEngineRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly domainPositionRepository: DomainPositionRepository,
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

        const searchEngine = await this.searchEngineRepository.findById(
          keyword.getSearchEngineId(),
        );

        const searchResults = await this.scrapeResults(
          keyword.getKeywordText(),
          keyword.getDevice().value,
          ScrapeStrategyFactory.get(
            searchEngine.engineKey,
            this.configService,
            this.http,
          ),
          domain.userId,
          localization.domainParam,
        );

        await this.processSearchResults(
          searchResults,
          domain.text,
          keyword.getKeywordId(),
        );
      }

      skip = TAKE * (skip + 1);

      keywords = await this.keywordRepository.findAll(TAKE, skip);
    }
  }

  private async scrapeResults(
    query: string,
    device: string,
    scrapeStrategy: ScrapeStrategy,
    userId: string,
    domainParam: string,
  ) {
    const searchResults: SearchResult[] = [];

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    for (
      let page = 1;
      page < userSubscriptionInfo.maxSearchedPages + 1;
      page++
    ) {
      const result = await this.serpapiClient.scrape(
        query,
        page,
        device,
        scrapeStrategy,
        domainParam,
      );
      searchResults.push(...result);
    }

    return searchResults;
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
