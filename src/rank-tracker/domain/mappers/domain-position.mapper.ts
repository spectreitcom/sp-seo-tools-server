import { DomainPosition } from '../domain-position';
import { RtDomainPosition } from '@prisma/client';

export class DomainPositionMapper {
  static toDomain(rtDomainPosition: RtDomainPosition) {
    return new DomainPosition(
      rtDomainPosition.id,
      rtDomainPosition.keywordId,
      rtDomainPosition.position,
      rtDomainPosition.timestamp,
      rtDomainPosition.processId,
      rtDomainPosition.status,
    );
  }
}
