import { UserSubscription } from '../user-subscription';
import { randomUUID } from 'crypto';

describe('UserSubscription', () => {
  describe('activate', () => {
    it('should activate the subscription', () => {
      const userSubscription = new UserSubscription(
        randomUUID(),
        randomUUID(),
        randomUUID(),
        randomUUID(),
      );

      userSubscription.activate();

      expect(userSubscription.getActive()).toBeTruthy();
    });
  });
});
