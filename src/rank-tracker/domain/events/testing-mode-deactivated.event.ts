import { IEvent } from '@nestjs/cqrs';

export class TestingModeDeactivatedEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
