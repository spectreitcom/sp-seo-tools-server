import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProgressQuery } from '../queries/get-progress.query';
import { GetProgressQueryResponse } from '../query-handlers/get-progress.query-handler';

@Injectable()
export class AnalysisProgressService {
  constructor(private readonly queryBus: QueryBus) {}

  async getProgress(userId: string, analysisId: string) {
    return this.queryBus.execute<GetProgressQuery, GetProgressQueryResponse>(
      new GetProgressQuery(userId, analysisId),
    );
  }
}
