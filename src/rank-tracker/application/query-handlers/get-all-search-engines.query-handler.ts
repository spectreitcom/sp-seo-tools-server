import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSearchEnginesQuery } from '../queries/get-all-search-engines.query';
import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';
import { SearchEnginesListRepository } from '../ports/search-engines-list.repository';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { GOOGLE_ENGINE_KEY } from '../constants';

@QueryHandler(GetAllSearchEnginesQuery)
export class GetAllSearchEnginesQueryHandler
  implements IQueryHandler<GetAllSearchEnginesQuery, SearchEnginesListItemDto[]>
{
  constructor(
    private readonly searchEnginesListRepository: SearchEnginesListRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetAllSearchEnginesQuery,
  ): Promise<SearchEnginesListItemDto[]> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUserId(userId);
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (testingMode && testingMode.getActive()) {
      const googleSearchEngine =
        await this.searchEnginesListRepository.findByEngineKey(
          GOOGLE_ENGINE_KEY,
        );
      return googleSearchEngine ? [googleSearchEngine] : [];
    }

    if (userSubscriptionInfo && userSubscriptionInfo.getActive()) {
      return this.searchEnginesListRepository.findAll();
    }

    return [];
  }
}
