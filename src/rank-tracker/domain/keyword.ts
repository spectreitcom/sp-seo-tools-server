import {
  InactiveSubscriptionError,
  InvalidDeviceError,
  IsKeywordsQuantityExceededError,
} from './exceptions';
import { AggregateRoot } from '@nestjs/cqrs';
import { KeywordAddedEvent } from './events/keyword-added.event';
import { AvailableKeywordsQuantity } from './value-objects/available-keywords-quantity';
import { Device } from './value-objects/device';
import { RtKeywordGrowth } from '@prisma/client';

export class Keyword extends AggregateRoot {
  constructor(
    private readonly isSubscriptionActive: boolean,
    private readonly availableKeywordQuantity: AvailableKeywordsQuantity,
    private readonly keywordId: string,
    private readonly domainId: string,
    private readonly keywordText: string,
    private readonly device: Device,
    private readonly localizationId: string,
    private readonly testingModeActive: boolean,
    private readonly timestamp: number,
    private growth: RtKeywordGrowth,
  ) {
    super();
    if (!this.device.isValid()) {
      throw new InvalidDeviceError();
    }
  }

  create() {
    if (!this.testingModeActive && !this.isSubscriptionActive) {
      throw new InactiveSubscriptionError();
    }

    if (this.availableKeywordQuantity.isExceeded()) {
      throw new IsKeywordsQuantityExceededError();
    }

    this.apply(new KeywordAddedEvent(this.keywordId));
  }

  growthUp() {
    this.growth = 'UP';
  }

  growthDown() {
    this.growth = 'DOWN';
  }

  growthNoChange() {
    this.growth = 'NO_CHANGE';
  }

  getGrowth() {
    return this.growth;
  }

  getKeywordText() {
    return this.keywordText;
  }

  getKeywordId() {
    return this.keywordId;
  }

  getDomainId() {
    return this.domainId;
  }

  getDevice() {
    return this.device;
  }

  getLocalizationId() {
    return this.localizationId;
  }

  getTimestamp() {
    return this.timestamp;
  }
}
