import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserMonthlyUsageQuery } from '../queries/get-user-monthly-usage.query';
import { AnalysisRepository } from '../ports/analysis.repository';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

export type GetUserMonthlyUsageQueryResponse = {
  monthlyLimit: number;
  usedQuota: number;
};

@QueryHandler(GetUserMonthlyUsageQuery)
export class GetUserMonthlyUsageQueryHandler
  implements
    IQueryHandler<GetUserMonthlyUsageQuery, GetUserMonthlyUsageQueryResponse>
{
  constructor(
    private readonly analysisRepository: AnalysisRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetUserMonthlyUsageQuery,
  ): Promise<GetUserMonthlyUsageQueryResponse> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUser(userId);
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    let monthlyLimit = 0;

    if (userSubscriptionInfo?.getActive()) {
      monthlyLimit = userSubscriptionInfo.getAnalysisPerMonth();

      const usedQuota =
        await this.analysisRepository.getUsedQuotaInCurrentMonth(userId);

      return {
        monthlyLimit,
        usedQuota,
      };
    }

    if (testingMode?.getActive()) {
      monthlyLimit = testingMode.getAnalysisPerMonth();

      const usedQuota =
        await this.analysisRepository.getUsedQuotaInCurrentMonth(userId);

      return {
        monthlyLimit,
        usedQuota,
      };
    }

    return {
      monthlyLimit: 0,
      usedQuota: 0,
    };
  }
}
