import { TestingMode } from '../testing-mode';
import { randomUUID } from 'crypto';
import { ExpiresAt } from '../value-objects/expires-at';

export class TestingModeFactory {
  static create(
    userId: string,
    searchedPages: number,
    analysisPerMonth: number,
    wasActivatedEarlier: boolean,
    userHasEverBoughtSubscription: boolean,
    expiresAt: number,
    active = false,
  ) {
    return new TestingMode(
      randomUUID(),
      userId,
      active,
      searchedPages,
      analysisPerMonth,
      wasActivatedEarlier,
      userHasEverBoughtSubscription,
      new ExpiresAt(expiresAt),
    );
  }
}
