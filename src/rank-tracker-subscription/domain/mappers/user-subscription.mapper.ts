import { RankTrackerUserSubscription } from '@prisma/client';
import { UserSubscription } from '../user-subscription';

export class UserSubscriptionMapper {
  static toDomain(rankTrackerUserSubscription: RankTrackerUserSubscription) {
    return new UserSubscription(
      rankTrackerUserSubscription.id,
      rankTrackerUserSubscription.userId,
      rankTrackerUserSubscription.subscriptionId,
      rankTrackerUserSubscription.sessionId,
      rankTrackerUserSubscription.customerId,
      rankTrackerUserSubscription.active,
    );
  }
}
