import { SubscriptionFactory } from '../subscription.factory';
import { Subscription } from '../../subscription';

describe('SubscriptionFactory', () => {
  describe('create', () => {
    it('should create a subscription instance', () => {
      const subscription = SubscriptionFactory.create(
        'Pro',
        30,
        50,
        100,
        'price_123',
      );
      expect(subscription).toBeInstanceOf(Subscription);
    });
  });
});
