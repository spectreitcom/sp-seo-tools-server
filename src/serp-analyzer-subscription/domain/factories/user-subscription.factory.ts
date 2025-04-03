import { UserSubscription } from '../user-subscription';
import { randomUUID } from 'crypto';

export class UserSubscriptionFactory {
  static create(
    subscriptionId: string,
    active: boolean,
    userId: string,
    sessionId: string,
    customerId: string,
  ) {
    return new UserSubscription(
      randomUUID(),
      subscriptionId,
      active,
      userId,
      sessionId,
      customerId,
    );
  }
}
