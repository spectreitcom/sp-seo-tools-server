import { Subscription } from '../subscription';
import { RankTrackerSubscription } from '@prisma/client';

export class SubscriptionMapper {
  static toDomain(rankTrackerSubscription: RankTrackerSubscription) {
    return new Subscription(
      rankTrackerSubscription.id,
      rankTrackerSubscription.name,
      rankTrackerSubscription.amount,
      rankTrackerSubscription.maxKeywordsQty,
      rankTrackerSubscription.priceId,
      rankTrackerSubscription.maxSearchedPages,
    );
  }
}
