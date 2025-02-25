import { IEvent } from '@nestjs/cqrs';

export class SearchEngineCreatedIntegrationEvent implements IEvent {
  constructor(
    public readonly searchEngineId: string,
    public readonly engineKey: string,
    public readonly engineName: string,
  ) {}
}
