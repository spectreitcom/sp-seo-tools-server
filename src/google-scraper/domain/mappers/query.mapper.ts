import { GsQuery } from '@prisma/client';
import { Query } from '../query';
import { GetDataResponse, Metadata } from '../../application/types';

export class QueryMapper {
  static toDomain(model: GsQuery) {
    return new Query(
      model.id,
      model.processId,
      model.status,
      model.metadata as Metadata,
      model.results as GetDataResponse,
      model.localizationCode,
      model.resultsNumber,
      model.query,
      model.device,
      model.userId,
      model.createdAt,
      model.checkedAt,
    );
  }
}
