import { UserSubscription } from '../../domain/user-subscription';

export abstract class UserSubscriptionRepository {
  abstract save(userSubscription: UserSubscription): Promise<void>;
  abstract hasUserActiveSubscription(userId: string): Promise<boolean>;
  abstract findByUser(userId: string): Promise<UserSubscription | null>;
  abstract findByCustomer(customerId: string): Promise<UserSubscription | null>;
}
