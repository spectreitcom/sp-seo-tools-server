import { UserSubscriptionInfoFactory } from '../factories/user-subscription-info.factory';
import { randomUUID } from 'crypto';

describe('UserSubscriptionInfo', () => {
  describe('activate', () => {
    it('should activate', () => {
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        randomUUID(),
        5,
        50,
      );

      userSubscriptionInfo.activate();
      expect(userSubscriptionInfo.getActive()).toBeTruthy();
    });
  });
  describe('deactivate', () => {
    it('should deactivate', () => {
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        randomUUID(),
        5,
        50,
        true,
      );
      userSubscriptionInfo.deactivate();
      expect(userSubscriptionInfo.getActive()).toBeFalsy();
    });
  });
});
