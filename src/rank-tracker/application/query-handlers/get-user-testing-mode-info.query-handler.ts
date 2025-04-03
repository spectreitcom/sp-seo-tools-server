import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserTestingModeInfoDto } from '../dto/user-testing-mode-info.dto';
import { GetUserTestingModeInfoQuery } from '../queries/get-user-testing-mode-info.query';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@QueryHandler(GetUserTestingModeInfoQuery)
export class GetUserTestingModeInfoQueryHandler
  implements IQueryHandler<GetUserTestingModeInfoQuery, UserTestingModeInfoDto>
{
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetUserTestingModeInfoQuery,
  ): Promise<UserTestingModeInfoDto> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUserId(userId);

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (testingMode) {
      return new UserTestingModeInfoDto(
        testingMode.getActive(),
        false,
        testingMode.getExpiresAt(),
      );
    }

    if (userSubscriptionInfo) {
      return new UserTestingModeInfoDto(
        testingMode ? testingMode.getActive() : false,
        false,
        testingMode ? testingMode.getExpiresAt() : null,
      );
    }

    return new UserTestingModeInfoDto(false, true, null);
  }
}
