import { UserSubscription } from '../../domain/user-subscription';

export abstract class UserSubscriptionRepository {
  abstract save(userSubscription: UserSubscription): Promise<void>;
  abstract findByUser(userId: string): Promise<UserSubscription>;
  abstract findByCustomer(customerId: string): Promise<UserSubscription>;
}
