import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionCreatedEvent } from './events/subscription-created.event';

export class Subscription extends AggregateRoot {
  constructor(
    private readonly subscriptionId: string,
    private readonly name: string,
    private readonly amount: number,
    private readonly maxKeywordsQty: number,
    private readonly priceId: string,
    private readonly maxSearchedPages: number,
  ) {
    super();
  }

  create() {
    this.apply(
      new SubscriptionCreatedEvent(
        this.subscriptionId,
        this.name,
        this.amount,
        this.maxKeywordsQty,
        this.priceId,
        this.maxSearchedPages,
      ),
    );
  }

  getSubscriptionId() {
    return this.subscriptionId;
  }

  getName() {
    return this.name;
  }

  getAmount() {
    return this.amount;
  }

  getMaxKeywordsQty() {
    return this.maxKeywordsQty;
  }

  getPriceId() {
    return this.priceId;
  }

  getMaxSearchedPages() {
    return this.maxSearchedPages;
  }
}
