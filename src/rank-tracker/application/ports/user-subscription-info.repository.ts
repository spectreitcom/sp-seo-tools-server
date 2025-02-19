import { UserSubscriptionInfo } from '../../domain/user-subscription-info';

export abstract class UserSubscriptionInfoRepository {
  abstract save(userSubscriptionInfo: UserSubscriptionInfo): Promise<void>;
  abstract findById(
    userSubscriptionInfoId: string,
  ): Promise<UserSubscriptionInfo>;
  abstract findByUser(userId: string): Promise<UserSubscriptionInfo>;
}
