import { Subscription } from '../subscription';
import { randomUUID } from 'crypto';

export class SubscriptionFactory {
  static create(
    name: string,
    amount: number,
    maxKeywordsQty: number,
    priceId: string,
    maxSearchedPages: number,
  ) {
    return new Subscription(
      randomUUID(),
      name,
      amount,
      maxKeywordsQty,
      priceId,
      maxSearchedPages,
    );
  }
}
