import { Injectable } from '@nestjs/common';
import { UserSubscriptionInfoRepository } from '../../application/ports/user-subscription-info.repository';
import { DatabaseService } from '../../../database/database.service';
import { UserSubscriptionInfo } from '../../domain/user-subscription-info';
import { UserSubscriptionInfoMapper } from '../../domain/mappers/user-subscription-info.mapper';

@Injectable()
export class PrismaUserSubscriptionInfoRepository
  implements UserSubscriptionInfoRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(userSubscriptionInfo: UserSubscriptionInfo): Promise<void> {
    const userSubscriptionInfoModel =
      await this.databaseService.saUserSubscriptionInfo.findUnique({
        where: {
          id: userSubscriptionInfo.getUserSubscriptionInfoId(),
        },
      });

    if (userSubscriptionInfoModel) {
      await this.databaseService.saUserSubscriptionInfo.update({
        where: { id: userSubscriptionInfo.getUserSubscriptionInfoId() },
        data: {
          userId: userSubscriptionInfo.getUserId(),
          active: userSubscriptionInfo.getActive(),
          analysisPerMonth: userSubscriptionInfo.getAnalysisPerMonth(),
          searchedPages: userSubscriptionInfo.getSearchedPages(),
        },
      });
      return;
    }

    await this.databaseService.saUserSubscriptionInfo.create({
      data: {
        id: userSubscriptionInfo.getUserSubscriptionInfoId(),
        userId: userSubscriptionInfo.getUserId(),
        active: userSubscriptionInfo.getActive(),
        analysisPerMonth: userSubscriptionInfo.getAnalysisPerMonth(),
        searchedPages: userSubscriptionInfo.getSearchedPages(),
      },
    });
  }

  async findByUser(userId: string): Promise<UserSubscriptionInfo> {
    const model = await this.databaseService.saUserSubscriptionInfo.findUnique({
      where: {
        userId,
      },
    });
    if (!model) return null;
    return UserSubscriptionInfoMapper.toDomain(model);
  }
}
