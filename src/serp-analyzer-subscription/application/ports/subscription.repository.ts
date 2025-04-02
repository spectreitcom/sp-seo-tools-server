import { Subscription } from '../../domain/subscription';

export abstract class SubscriptionRepository {
  abstract save(subscription: Subscription): Promise<void>;
  abstract findByPriceId(priceId: string): Promise<Subscription>;
  abstract findById(subscriptionId: string): Promise<Subscription>;
}
