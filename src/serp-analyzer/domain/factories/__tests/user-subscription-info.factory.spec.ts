import { UserSubscriptionInfoFactory } from '../user-subscription-info.factory';
import { randomUUID } from 'crypto';
import { UserSubscriptionInfo } from '../../user-subscription-info';

describe('UserSubscriptionInfoFactory', () => {
  describe('create', () => {
    it('should create a UserSubscription instance', () => {
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        randomUUID(),
        5,
        50,
      );
      expect(userSubscriptionInfo).toBeInstanceOf(UserSubscriptionInfo);
    });
  });
});
