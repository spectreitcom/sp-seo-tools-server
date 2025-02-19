import { IEvent } from '@nestjs/cqrs';

export class LocalizationCreatedEvent implements IEvent {
  constructor(
    public readonly localizationId: string,
    public readonly domainParam: string,
    public readonly searchEngineId: string,
    public readonly countryCode: string,
    public readonly name: string,
  ) {}
}
