import { UserSubscriptionFactory } from '../factories/user-subscription.factory';
import { randomUUID } from 'crypto';

describe('UserSubscription', () => {
  describe('activate', () => {
    it('should activate the subscription', () => {
      const userSubscription = UserSubscriptionFactory.create(
        randomUUID(),
        false,
        randomUUID(),
        randomUUID(),
        randomUUID(),
      );

      userSubscription.activate();

      expect(userSubscription.getActive()).toBeTruthy();
    });

    it('should deactivate subscription', () => {
      const userSubscription = UserSubscriptionFactory.create(
        randomUUID(),
        true,
        randomUUID(),
        randomUUID(),
        randomUUID(),
      );

      userSubscription.deactivate();

      expect(userSubscription.getActive()).toBeFalsy();
    });
  });
});
