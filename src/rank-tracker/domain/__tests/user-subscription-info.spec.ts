import { UserSubscriptionInfoFactory } from '../factories/user-subscription-info.factory';
import { randomUUID } from 'crypto';

describe('UserSubscriptionInfo', () => {
  describe('activate', () => {
    it('should activate the subscription', () => {
      const USER_ID = randomUUID();
      const MAX_KEYWORDS_QTY = 100;
      const MAX_SEARCHED_PAGES = 10;
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        USER_ID,
        MAX_KEYWORDS_QTY,
        MAX_SEARCHED_PAGES,
      );
      userSubscriptionInfo.activate();

      expect(userSubscriptionInfo.getActive()).toBeTruthy();
    });
  });
  describe('deactivate', () => {
    it('should deactivate the subscription', () => {
      const USER_ID = randomUUID();
      const MAX_KEYWORDS_QTY = 100;
      const MAX_SEARCHED_PAGES = 10;
      const userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        USER_ID,
        MAX_KEYWORDS_QTY,
        MAX_SEARCHED_PAGES,
      );
      userSubscriptionInfo.activate();

      userSubscriptionInfo.deactivate();

      expect(userSubscriptionInfo.getActive()).toBeFalsy();
    });
  });
});
