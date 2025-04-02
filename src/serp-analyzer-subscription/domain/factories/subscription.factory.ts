import { Subscription } from '../subscription';
import { randomUUID } from 'crypto';

export class SubscriptionFactory {
  static create(
    name: string,
    amount: number,
    searchedPages: number,
    analysisPerMonth: number,
    priceId: string,
  ) {
    return new Subscription(
      randomUUID(),
      name,
      amount,
      searchedPages,
      analysisPerMonth,
      priceId,
    );
  }
}
