import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDomainPositionHistoryQuery } from '../queries/get-domain-position-history.query';
import { GetKeywordPositionHistoryQueryResponse } from '../query-handlers/get-domain-position-history.query-handler';

@Injectable()
export class DomainHistoryPositionService {
  constructor(private readonly queryBus: QueryBus) {}

  async getDomainHistoryPosition(
    keywordId: string,
    userId: string,
    fromDate: string | null | undefined,
    toDate: string | null | undefined,
    page: number,
    take: number,
  ) {
    return this.queryBus.execute<
      GetDomainPositionHistoryQuery,
      GetKeywordPositionHistoryQueryResponse
    >(
      new GetDomainPositionHistoryQuery(
        keywordId,
        userId,
        fromDate,
        toDate,
        page,
        take,
      ),
    );
  }
}
