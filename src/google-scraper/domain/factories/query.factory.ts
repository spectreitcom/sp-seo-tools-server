import { Query } from '../query';
import { randomUUID } from 'crypto';
import { GsQueryStatus } from '@prisma/client';
import { Metadata } from '../../application/types';
import * as moment from 'moment';

export class QueryFactory {
  static create(
    processId: string,
    metadata: Metadata,
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: string,
    userId: string,
  ) {
    return new Query(
      randomUUID(),
      processId,
      GsQueryStatus.PENDING,
      metadata,
      null,
      localizationCode,
      resultsNumber,
      query,
      device,
      userId,
      moment().unix(),
      moment().unix(),
    );
  }
}
