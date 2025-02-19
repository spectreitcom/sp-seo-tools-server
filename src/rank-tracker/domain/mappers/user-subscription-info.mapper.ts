import { UserSubscriptionInfo } from '../user-subscription-info';
import { RtUserSubscriptionInfo } from '@prisma/client';

export class UserSubscriptionInfoMapper {
  static toDomain(rtUserSubscriptionInfo: RtUserSubscriptionInfo) {
    return new UserSubscriptionInfo(
      rtUserSubscriptionInfo.id,
      rtUserSubscriptionInfo.userId,
      rtUserSubscriptionInfo.active,
      rtUserSubscriptionInfo.maxKeywordsQty,
      rtUserSubscriptionInfo.maxSearchedPages,
    );
  }
}
