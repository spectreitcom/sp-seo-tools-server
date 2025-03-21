import { Processor, WorkerHost } from '@nestjs/bullmq';
import { DOMAIN_POSITION_PROCESSING_QUEUE } from '../constants';
import { GoogleScraperFacade } from '../../../../google-scraper/application/google-scraper.facade';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { UserSubscriptionInfoRepository } from '../../../application/ports/user-subscription-info.repository';
import { TestingModeRepository } from '../../../application/ports/testing-mode.repository';
import { Keyword } from '../../../domain/keyword';
import { Domain } from '../../../domain/domain';
import { sleep } from '../../../../shared/utils';
import { SearchResult } from '../../types';
import { DomainPosition } from '../../../domain/domain-position';
import { EventPublisher } from '@nestjs/cqrs';
import { PositionChecker } from '../position-checker';

const TAKE = 100;

@Processor(DOMAIN_POSITION_PROCESSING_QUEUE)
export class DomainPositionProcessingConsumer extends WorkerHost {
  constructor(
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly domainPositionRepository: DomainPositionRepository,
    private readonly keywordRepository: KeywordRepository,
    private readonly domainRepository: DomainRepository,
    private readonly useSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;
    let domainPositions = await this.domainPositionRepository.findAll(
      TAKE,
      skip,
      'PENDING',
    );

    while (!!domainPositions.length) {
      const keywords = await this.keywordRepository.findAllWithIds(
        domainPositions.map((domainPosition) => domainPosition.getKeywordId()),
      );

      const uniqueDomainIds = this.getUniqueDomainIds(keywords);

      const domains =
        await this.domainRepository.findAllWithIds(uniqueDomainIds);

      const uniqueUserIds = this.getUniqueUserIds(domains);

      const userSubscriptionInfos =
        await this.useSubscriptionInfoRepository.findAllActiveByUserIds(
          uniqueUserIds,
        );

      const testingModes =
        await this.testingModeRepository.findAllActiveByUserIds(uniqueUserIds);

      for (const domainPosition of domainPositions) {
        await sleep(10000);

        const keyword = keywords.find(
          (keyword) => keyword.getKeywordId() === domainPosition.getKeywordId(),
        );

        if (!keyword) continue;

        const domain = domains.find(
          (domain) => domain.domainId === keyword.getDomainId(),
        );

        if (!domain) continue;

        let resultsNumber: number | null = null;

        const useSubscriptionInfo = userSubscriptionInfos.find(
          (usi) => usi.getUserId() === domain.userId,
        );

        const testingMode = testingModes.find(
          (tm) => tm.getUserId() === domain.userId,
        );

        if (useSubscriptionInfo && useSubscriptionInfo.getActive()) {
          resultsNumber = useSubscriptionInfo.getMaxSearchedPages() * 10;
          const searchResults = await this.googleScraperFacade.getResults(
            domainPosition.getProcessId(),
            resultsNumber,
          );
          if (Array.isArray(searchResults)) {
            await this.processSearchResults(
              searchResults,
              domainPosition,
              domain,
            );
          }
        }

        if (testingMode && testingMode.getActive()) {
          resultsNumber = testingMode.getMaxSearchedPages() * 10;
          const searchResults = await this.googleScraperFacade.getResults(
            domainPosition.getProcessId(),
            resultsNumber,
          );
          if (Array.isArray(searchResults)) {
            await this.processSearchResults(
              searchResults,
              domainPosition,
              domain,
            );
          }
        }
      }

      skip = TAKE * (skip + 1);
      domainPositions = await this.domainPositionRepository.findAll(
        TAKE,
        skip,
        'PENDING',
      );
    }
  }

  private async processSearchResults(
    searchResults: SearchResult[],
    domainPosition: DomainPosition,
    domain: Domain,
  ) {
    const position = PositionChecker.getHighestPosition(
      searchResults,
      domain.text,
    );
    this.eventPublisher.mergeObjectContext(domainPosition);
    domainPosition.updateStatus('DONE');
    domainPosition.updatePosition(position === -1 ? 0 : position);
    await this.domainPositionRepository.save(domainPosition);
    domainPosition.commit();
  }

  private getUniqueDomainIds(keywords: Keyword[]) {
    const uniqueDomainIds: string[] = [];
    for (const keyword of keywords) {
      if (!uniqueDomainIds.includes(keyword.getDomainId())) {
        uniqueDomainIds.push(keyword.getDomainId());
      }
    }
    return uniqueDomainIds;
  }

  private getUniqueUserIds(domains: Domain[]) {
    const uniqueUserIds: string[] = [];
    for (const domain of domains) {
      if (!uniqueUserIds.includes(domain.userId)) {
        uniqueUserIds.push(domain.userId);
      }
    }
    return uniqueUserIds;
  }
}
