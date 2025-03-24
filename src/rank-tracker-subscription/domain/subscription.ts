import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionCreatedEvent } from './events/subscription-created.event';

export class Subscription extends AggregateRoot {
  constructor(
    private subscriptionId: string,
    private name: string,
    private amount: number,
    private maxKeywordsQty: number,
    private priceId: string,
    private maxSearchedPages: number,
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
