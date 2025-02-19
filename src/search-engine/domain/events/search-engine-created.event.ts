import { IEvent } from '@nestjs/cqrs';

export class SearchEngineCreatedEvent implements IEvent {
  constructor(
    public readonly searchEngineId: string,
    public readonly engineKey: string,
    public readonly engineName: string,
  ) {}
}
