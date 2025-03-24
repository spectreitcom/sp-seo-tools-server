import { TestingMode } from '../testing-mode';
import { randomUUID } from 'crypto';
import { ExpiresAt } from '../value-objects/expires-at';

export class TestingModeFactory {
  static create(
    userId: string,
    wasActivatedEarlier: boolean,
    userSubscriptionBought: boolean,
    expiresAt: number,
    maxKeywordsQty: number,
    maxSearchedPages: number,
  ) {
    return new TestingMode(
      randomUUID(),
      userId,
      wasActivatedEarlier,
      userSubscriptionBought,
      false,
      new ExpiresAt(expiresAt),
      maxKeywordsQty,
      maxSearchedPages,
    );
  }
}
