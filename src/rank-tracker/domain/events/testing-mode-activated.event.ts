import { IEvent } from '@nestjs/cqrs';

export class TestingModeActivatedEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
