import { IEvent } from '@nestjs/cqrs';

export class DomainPositionCreatedEvent implements IEvent {
  constructor(public readonly domainPositionId: string) {}
}
