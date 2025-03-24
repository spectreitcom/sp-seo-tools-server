import { UserSubscriptionInfoFactory } from '../user-subscription-info.factory';
import { UserSubscriptionInfo } from '../../user-subscription-info';
import { randomUUID } from 'crypto';

describe('UserSubscriptionInfoFactory', () => {
  describe('create', () => {
    it('should create a UserSubscriptionInfo instance with the given parameters', () => {
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        randomUUID(),
        100,
        10,
      );
      expect(userSubscriptionInfo).toBeInstanceOf(UserSubscriptionInfo);
    });
  });
});
