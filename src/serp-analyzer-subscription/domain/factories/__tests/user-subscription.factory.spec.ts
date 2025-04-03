import { UserSubscriptionFactory } from '../user-subscription.factory';
import { randomUUID } from 'crypto';
import { UserSubscription } from '../../user-subscription';

describe('UserSubscriptionFactory', () => {
  describe('create', () => {
    it('should create an instance of UserSubscription', () => {
      const userSubscription = UserSubscriptionFactory.create(
        randomUUID(),
        false,
        randomUUID(),
        randomUUID(),
        randomUUID(),
      );
      expect(userSubscription).toBeInstanceOf(UserSubscription);
    });
  });
});
