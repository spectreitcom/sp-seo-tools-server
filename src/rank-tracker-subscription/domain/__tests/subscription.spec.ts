import { randomUUID } from 'crypto';
import { Subscription } from '../subscription';

describe('Subscription', () => {
  describe('create', () => {
    it('should create a subscription', () => {
      const SUBSCRIPTION_ID = randomUUID();
      const SUBSCRIPTION_NAME = 'Pro';
      const AMOUNT = 10;
      const MAX_KEYWORDS_QTY = 100;
      const PRICE_ID = 'price_123';
      const MAX_SEARCHED_PAGES = 50;

      const subscription = new Subscription(
        SUBSCRIPTION_ID,
        SUBSCRIPTION_NAME,
        AMOUNT,
        MAX_KEYWORDS_QTY,
        PRICE_ID,
        MAX_SEARCHED_PAGES,
      );

      subscription.create();

      expect(subscription.getSubscriptionId()).toEqual(SUBSCRIPTION_ID);
      expect(subscription.getName()).toEqual(SUBSCRIPTION_NAME);
      expect(subscription.getAmount()).toEqual(AMOUNT);
      expect(subscription.getMaxKeywordsQty()).toEqual(MAX_KEYWORDS_QTY);
      expect(subscription.getPriceId()).toEqual(PRICE_ID);
      expect(subscription.getMaxSearchedPages()).toEqual(MAX_SEARCHED_PAGES);
    });
  });
});
