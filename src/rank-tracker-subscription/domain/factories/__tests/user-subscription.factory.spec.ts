import { randomUUID } from 'crypto';
import { UserSubscriptionFactory } from '../user-subscription.factory';
import { UserSubscription } from '../../user-subscription';

describe('UserSubscriptionFactory', () => {
  describe('create', () => {
    it('should create a UserSubscription', () => {
      const USER_ID = randomUUID();
      const SUBSCRIPTION_ID = randomUUID();
      const SESSION_ID = randomUUID();
      const CUSTOMER_ID = randomUUID();
      const userSubscription = UserSubscriptionFactory.create(
        USER_ID,
        SUBSCRIPTION_ID,
        SESSION_ID,
        CUSTOMER_ID,
      );

      expect(userSubscription).toBeInstanceOf(UserSubscription);
    });
  });
});
