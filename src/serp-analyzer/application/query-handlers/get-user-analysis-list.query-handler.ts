import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserAnalysisListQuery } from '../queries/get-user-analysis-list.query';
import { CollectionData } from '../../../shared/types/collection.data';
import { UserAnalysisReadModel } from '../../infrastructure/read-models/user-analysis.read-model';
import { UserAnalysisRepository } from '../ports/user-analysis.repository';

export type GetUserAnalysisListQueryResponse =
  CollectionData<UserAnalysisReadModel>;

@QueryHandler(GetUserAnalysisListQuery)
export class GetUserAnalysisListQueryHandler
  implements
    IQueryHandler<GetUserAnalysisListQuery, GetUserAnalysisListQueryResponse>
{
  constructor(
    private readonly userAnalysisRepository: UserAnalysisRepository,
  ) {}

  async execute(
    query: GetUserAnalysisListQuery,
  ): Promise<GetUserAnalysisListQueryResponse> {
    const { userId, take, page, localizationId, searchText, device } = query;

    const skip = (page - 1) * take;

    const data = await this.userAnalysisRepository.findAllByUser(
      userId,
      take,
      skip,
      searchText,
      localizationId,
      device,
    );

    const total = await this.userAnalysisRepository.countAllWithSearchParams(
      userId,
      searchText,
      localizationId,
      device,
    );

    const userTotal = await this.userAnalysisRepository.countAllForUser(userId);

    return {
      data,
      total,
      userTotal,
    };
  }
}
