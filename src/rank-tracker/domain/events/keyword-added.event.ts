import { IEvent } from '@nestjs/cqrs';

export class KeywordAddedEvent implements IEvent {
  constructor(public readonly keywordId: string) {}
}
