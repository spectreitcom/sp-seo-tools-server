import { GetUserTestingModeInfoQuery } from '../queries/get-user-testing-mode-info.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTestingModeInfoReadModel } from '../../infrastructure/read-models/user-testing-mode-info.read-model';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@QueryHandler(GetUserTestingModeInfoQuery)
export class GetUserTestingModeInfoQueryHandler
  implements
    IQueryHandler<GetUserTestingModeInfoQuery, UserTestingModeInfoReadModel>
{
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetUserTestingModeInfoQuery,
  ): Promise<UserTestingModeInfoReadModel> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUser(userId);
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (testingMode) {
      return new UserTestingModeInfoReadModel(
        testingMode.getActive(),
        false,
        testingMode.getExpiresAt(),
      );
    }

    if (userSubscriptionInfo) {
      return new UserTestingModeInfoReadModel(
        testingMode?.getActive() ?? false,
        false,
        testingMode?.getExpiresAt(),
      );
    }

    return new UserTestingModeInfoReadModel(false, true, null);
  }
}
