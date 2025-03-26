import { DomainPosition } from '../domain-position';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { RtDomainPositionStaus } from '@prisma/client';

export class DomainPositionFactory {
  static create(
    keywordId: string,
    processId: string,
    timestamp = moment().unix(),
    position: number | null = null,
    status: RtDomainPositionStaus = 'PENDING',
  ) {
    return new DomainPosition(
      randomUUID(),
      keywordId,
      position,
      timestamp,
      processId,
      status,
    );
  }
}
