import { SubscriptionFactory } from '../subscription.factory';
import { Subscription } from '../../subscription';

describe('SubscriptionFactory', () => {
  describe('create', () => {
    it('should create a subscription', () => {
      const subscription = SubscriptionFactory.create(
        'Pro',
        10,
        100,
        'price_1N4z1dK3Z8Q2h0b7z9v9v9v9',
        50,
      );
      expect(subscription).toBeInstanceOf(Subscription);
    });
  });
});
