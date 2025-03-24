import { IEvent } from '@nestjs/cqrs';
import { RtDomainPositionStaus } from '@prisma/client';

export class DomainPositionStatusUpdatedEvent implements IEvent {
  constructor(
    public readonly domainPositionId: string,
    public readonly status: RtDomainPositionStaus,
    public readonly keywordId: string,
  ) {}
}
