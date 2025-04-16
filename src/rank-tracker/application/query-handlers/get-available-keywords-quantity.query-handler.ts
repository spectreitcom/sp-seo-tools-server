import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAvailableKeywordsQuantityQuery } from '../queries/get-available-keywords-quantity.query';
import { AvailableKeywordsQuantityDto } from '../dto/available-keywords-quantity.dto';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { KeywordRepository } from '../ports/keyword.repository';

@QueryHandler(GetAvailableKeywordsQuantityQuery)
export class GetAvailableKeywordsQuantityQueryHandler
  implements
    IQueryHandler<
      GetAvailableKeywordsQuantityQuery,
      AvailableKeywordsQuantityDto
    >
{
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly keywordRepository: KeywordRepository,
  ) {}

  async execute(
    query: GetAvailableKeywordsQuantityQuery,
  ): Promise<AvailableKeywordsQuantityDto> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUserId(userId);

    const usedKeywordsQty =
      await this.keywordRepository.getUsedKeywordsQty(userId);

    if (testingMode?.getActive()) {
      return new AvailableKeywordsQuantityDto(
        testingMode.getMaxKeywordsQty(),
        usedKeywordsQty,
        this.isExceeded(testingMode.getMaxKeywordsQty(), usedKeywordsQty),
      );
    }

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (userSubscriptionInfo?.getActive()) {
      return new AvailableKeywordsQuantityDto(
        userSubscriptionInfo.getMaxKeywordsQty(),
        usedKeywordsQty,
        this.isExceeded(
          userSubscriptionInfo.getMaxKeywordsQty(),
          usedKeywordsQty,
        ),
      );
    }

    return new AvailableKeywordsQuantityDto(0, 0, true);
  }

  private isExceeded(maxKeywordsQty: number, usedKeywordsQty: number) {
    if (maxKeywordsQty === 0) return true;
    return usedKeywordsQty >= maxKeywordsQty;
  }
}
