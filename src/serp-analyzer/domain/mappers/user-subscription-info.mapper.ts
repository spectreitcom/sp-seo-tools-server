import { SaUserSubscriptionInfo } from '@prisma/client';
import { UserSubscriptionInfo } from '../user-subscription-info';

export class UserSubscriptionInfoMapper {
  static toDomain(model: SaUserSubscriptionInfo) {
    return new UserSubscriptionInfo(
      model.id,
      model.userId,
      model.active,
      model.searchedPages,
      model.analysisPerMonth,
    );
  }
}
