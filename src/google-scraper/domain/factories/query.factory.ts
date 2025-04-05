import { Query } from '../query';
import { randomUUID } from 'crypto';
import { GsQueryStatus } from '@prisma/client';
import { Device, Metadata } from '../../application/types';

export class QueryFactory {
  static create(
    processId: string,
    metadata: Metadata,
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
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
    );
  }
}
