import { AggregateRoot } from '@nestjs/cqrs';
import { LocalizationCreatedEvent } from './events/localization-created.event';

export class Localization extends AggregateRoot {
  constructor(
    public readonly localizationId: string,
    public readonly countryCode: string,
    public readonly name: string,
  ) {
    super();
  }

  create() {
    this.apply(
      new LocalizationCreatedEvent(
        this.localizationId,
        this.countryCode,
        this.name,
      ),
    );
  }
}
