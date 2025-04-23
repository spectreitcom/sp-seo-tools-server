import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProgressQuery } from '../queries/get-progress.query';
import { AnalysisProgressRepository } from '../ports/analysis-progress.repository';

export type GetProgressQueryResponse = {
  progress: number;
};

@QueryHandler(GetProgressQuery)
export class GetProgressQueryHandler
  implements IQueryHandler<GetProgressQuery, GetProgressQueryResponse>
{
  constructor(
    private readonly analysisProgressRepository: AnalysisProgressRepository,
  ) {}

  async execute(query: GetProgressQuery): Promise<GetProgressQueryResponse> {
    const { userId, analysisId } = query;

    const progress =
      await this.analysisProgressRepository.findByAnalysisAndUser(
        analysisId,
        userId,
      );

    if (!progress) return { progress: 0 };

    return {
      progress: this.calcProgress(progress.getCurrent(), progress.getTotal()),
    };
  }

  private calcProgress(current: number, total: number) {
    if (!total || total === 0) return 0;
    return Math.floor((current / total) * 100);
  }
}
