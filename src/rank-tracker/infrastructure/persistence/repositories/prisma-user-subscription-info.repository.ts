import { Injectable } from '@nestjs/common';
import { UserSubscriptionInfoRepository } from '../../../application/ports/user-subscription-info.repository';
import { UserSubscriptionInfo } from 'src/rank-tracker/domain/user-subscription-info';
import { DatabaseService } from '../../../../database/database.service';
import { UserSubscriptionInfoMapper } from '../../../domain/mappers/user-subscription-info.mapper';

@Injectable()
export class PrismaUserSubscriptionInfoRepository
  implements UserSubscriptionInfoRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(userSubscriptionInfo: UserSubscriptionInfo): Promise<void> {
    const userSubscriptionInfoModel =
      await this.databaseService.rtUserSubscriptionInfo.findUnique({
        where: {
          id: userSubscriptionInfo.userSubscriptionInfoId,
        },
      });

    if (userSubscriptionInfoModel) {
      await this.databaseService.rtUserSubscriptionInfo.update({
        where: { id: userSubscriptionInfo.userSubscriptionInfoId },
        data: {
          userId: userSubscriptionInfo.userId,
          active: userSubscriptionInfo.active,
          maxKeywordsQty: userSubscriptionInfo.maxKeywordsQty,
          maxSearchedPages: userSubscriptionInfo.maxSearchedPages,
        },
      });
      return;
    }

    await this.databaseService.rtUserSubscriptionInfo.create({
      data: {
        id: userSubscriptionInfo.userSubscriptionInfoId,
        userId: userSubscriptionInfo.userId,
        active: userSubscriptionInfo.active,
        maxKeywordsQty: userSubscriptionInfo.maxKeywordsQty,
        maxSearchedPages: userSubscriptionInfo.maxSearchedPages,
      },
    });
  }

  async findById(
    userSubscriptionInfoId: string,
  ): Promise<UserSubscriptionInfo> {
    const userSubscriptionInfoModel =
      await this.databaseService.rtUserSubscriptionInfo.findUnique({
        where: { id: userSubscriptionInfoId },
      });

    if (!userSubscriptionInfoModel) return null;

    return UserSubscriptionInfoMapper.toDomain(userSubscriptionInfoModel);
  }

  async findByUser(userId: string): Promise<UserSubscriptionInfo> {
    const userSubscriptionInfoModel =
      await this.databaseService.rtUserSubscriptionInfo.findFirst({
        where: { userId },
      });

    if (!userSubscriptionInfoModel) return null;

    return UserSubscriptionInfoMapper.toDomain(userSubscriptionInfoModel);
  }
}
