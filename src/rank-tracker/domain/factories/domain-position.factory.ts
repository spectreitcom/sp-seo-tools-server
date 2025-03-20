import { DomainPosition } from '../domain-position';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

export class DomainPositionFactory {
  static create(
    keywordId: string,
    processId: string,
    timestamp = moment().unix(),
    position = 0,
  ) {
    return new DomainPosition(
      randomUUID(),
      keywordId,
      position,
      timestamp,
      processId,
      'PENDING',
    );
  }
}
