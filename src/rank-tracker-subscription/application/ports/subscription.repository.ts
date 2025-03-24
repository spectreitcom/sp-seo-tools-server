import { Subscription } from '../../domain/subscription';

export abstract class SubscriptionRepository {
  abstract save(subscription: Subscription): Promise<void>;
  abstract existsByPriceId(priceId: string): Promise<boolean>;
  abstract findById(subscriptionId: string): Promise<Subscription | null>;
}
