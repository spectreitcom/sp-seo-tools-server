import { AggregateRoot } from '@nestjs/cqrs';
import { CannotActivateTestingModeError } from './exceptions';
import { TestingModeActivatedEvent } from './events/testing-mode-activated.event';
import { TestingModeDeactivatedEvent } from './events/testing-mode-deactivated.event';
import { ExpiresAt } from './value-objects/expires-at';

export class TestingMode extends AggregateRoot {
  constructor(
    private readonly testingModeId: string,
    private readonly userId: string,
    private readonly wasActivatedEarlier: boolean,
    private readonly userHasEverBoughtSubscription: boolean,
    private active: boolean,
    private readonly expiresAt: ExpiresAt,
    private readonly maxKeywordsQty: number,
    private readonly maxSearchedPages: number,
  ) {
    super();
  }

  activate() {
    const canActivate =
      !this.userHasEverBoughtSubscription && !this.wasActivatedEarlier;

    if (!canActivate) {
      throw new CannotActivateTestingModeError();
    }

    this.active = true;

    this.apply(new TestingModeActivatedEvent(this.userId));
  }

  deactivate() {
    this.active = false;
    this.apply(new TestingModeDeactivatedEvent(this.userId));
  }

  getTestingModeId() {
    return this.testingModeId;
  }

  getUserId() {
    return this.userId;
  }

  getActive() {
    return this.active;
  }

  getExpiresAt() {
    return this.expiresAt;
  }

  getMaxKeywordsQty() {
    return this.maxKeywordsQty;
  }

  getMaxSearchedPages() {
    return this.maxSearchedPages;
  }
}
