import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAnalysisCommand } from '../commands/create-analysis.command';
import { GetUserAnalysisListQuery } from '../queries/get-user-analysis-list.query';
import { GetUserAnalysisListQueryResponse } from '../query-handlers/get-user-analysis-list.query-handler';
import { GetUserMonthlyUsageQuery } from '../queries/get-user-monthly-usage.query';
import { GetUserMonthlyUsageQueryResponse } from '../query-handlers/get-user-monthly-usage.query-handler';
import { AddCompetitorCommand } from '../commands/add-competitor.command';
import { GetAnalysisDetailsQuery } from '../queries/get-analysis-details.query';
import { GetAnalysisDetailsQueryResponse } from '../query-handlers/get-analysis-details.query-handler';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createAnalysis(userId: string, payload: CreateAnalysisDto) {
    return this.commandBus.execute<CreateAnalysisCommand, void>(
      new CreateAnalysisCommand(
        userId,
        payload.keyword,
        payload.localizationId,
        payload.device,
      ),
    );
  }

  async getUserAnalysisList(
    userId: string,
    page: number,
    take: number,
    localizationId: string | undefined,
    device: string | undefined,
    searchText: string | undefined,
  ) {
    return this.queryBus.execute<
      GetUserAnalysisListQuery,
      GetUserAnalysisListQueryResponse
    >(
      new GetUserAnalysisListQuery(
        userId,
        page,
        take,
        searchText,
        localizationId,
        device,
      ),
    );
  }

  async getUserMonthlyUsage(userId: string) {
    return this.queryBus.execute<
      GetUserMonthlyUsageQuery,
      GetUserMonthlyUsageQueryResponse
    >(new GetUserMonthlyUsageQuery(userId));
  }

  addCompetitor(userId: string, analysisId: string, url: string) {
    return this.commandBus.execute<AddCompetitorCommand, void>(
      new AddCompetitorCommand(userId, analysisId, url),
    );
  }

  getAnalysisDetails(userId: string, analysisId: string) {
    return this.queryBus.execute<
      GetAnalysisDetailsQuery,
      GetAnalysisDetailsQueryResponse
    >(new GetAnalysisDetailsQuery(userId, analysisId));
  }
}
