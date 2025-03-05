import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAvailableForUserSearchEnginesQuery } from '../queries/get-all-available-for-user-search-engines.query';
import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';
import { SearchEnginesListRepository } from '../ports/search-engines-list.repository';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { GOOGLE_ENGINE_KEY } from '../constants';

@QueryHandler(GetAllAvailableForUserSearchEnginesQuery)
export class GetAllAvailableForUserSearchEnginesQueryHandler
  implements
    IQueryHandler<
      GetAllAvailableForUserSearchEnginesQuery,
      SearchEnginesListItemDto[]
    >
{
  constructor(
    private readonly searchEnginesListRepository: SearchEnginesListRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetAllAvailableForUserSearchEnginesQuery,
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
