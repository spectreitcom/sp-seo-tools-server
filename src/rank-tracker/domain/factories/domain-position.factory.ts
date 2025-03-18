import { DomainPosition } from '../domain-position';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

export class DomainPositionFactory {
  static create(
    keywordId: string,
    position: number,
    timestamp = moment().unix(),
  ) {
    return new DomainPosition(randomUUID(), keywordId, position, timestamp);
  }
}
