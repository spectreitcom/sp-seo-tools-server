import {
  InactiveSubscriptionError,
  InvalidDeviceError,
  IsKeywordsQuantityExceededError,
} from './exceptions';
import { AggregateRoot } from '@nestjs/cqrs';
import { KeywordAddedEvent } from './events/keyword-added.event';
import { AvailableKeywordsQuantity } from './value-objects/available-keywords-quantity';
import { Device } from './value-objects/device';

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
}
