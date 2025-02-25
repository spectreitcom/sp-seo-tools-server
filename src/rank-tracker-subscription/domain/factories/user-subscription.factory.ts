import { UserSubscription } from '../user-subscription';
import { randomUUID } from 'crypto';

export class UserSubscriptionFactory {
  static create(userId: string, subscriptionId: string, sessionId: string) {
    return new UserSubscription(
      randomUUID(),
      userId,
      subscriptionId,
      sessionId,
    );
  }
}
