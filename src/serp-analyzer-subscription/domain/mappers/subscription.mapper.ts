import { SaSubscription } from '@prisma/client';
import { Subscription } from '../subscription';

export class SubscriptionMapper {
  static toDomain(model: SaSubscription) {
    return new Subscription(
      model.id,
      model.name,
      model.amount,
      model.searchedPages,
      model.analysisPerMonth,
      model.priceId,
    );
  }
}
