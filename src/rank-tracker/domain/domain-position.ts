import { RtDomainPositionStaus } from '@prisma/client';
import { AggregateRoot } from '@nestjs/cqrs';
import { DomainPositionCreatedEvent } from './events/domain-position-created.event';
import { DomainPositionStatusUpdatedEvent } from './events/domain-position-status-updated.event';

export class DomainPosition extends AggregateRoot {
  constructor(
    private readonly domainPositionId: string,
    private readonly keywordId: string,
    private position: number | null,
    private readonly timestamp: number,
    private readonly processId: string,
    private status: RtDomainPositionStaus,
  ) {
    super();
  }

  create() {
    this.apply(new DomainPositionCreatedEvent(this.domainPositionId));
  }

  updateStatus(status: RtDomainPositionStaus) {
    this.status = status;
    this.apply(
      new DomainPositionStatusUpdatedEvent(
        this.domainPositionId,
        this.status,
        this.keywordId,
      ),
    );
  }

  updatePosition(position: number | null) {
    this.position = position;
  }

  getDomainPositionId() {
    return this.domainPositionId;
  }

  getKeywordId() {
    return this.keywordId;
  }

  getPosition() {
    return this.position;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getProcessId() {
    return this.processId;
  }

  getStatus() {
    return this.status;
  }
}
