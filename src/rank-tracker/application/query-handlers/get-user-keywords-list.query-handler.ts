import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserKeywordsListQuery } from '../queries/get-user-keywords-list.query';
import { CollectionData } from '../../../shared/types/collection.data';
import { UserKeywordsListItemDto } from '../dto/user-keywords-list-item.dto';
import { UserKeywordsListRepository } from '../ports/user-keywords-list.repository';

export type GetUserKeywordsListQueryResponse =
  CollectionData<UserKeywordsListItemDto>;

@QueryHandler(GetUserKeywordsListQuery)
export class GetUserKeywordsListQueryHandler
  implements
    IQueryHandler<GetUserKeywordsListQuery, GetUserKeywordsListQueryResponse>
{
  constructor(
    private readonly userKeywordsListRepository: UserKeywordsListRepository,
  ) {}

  async execute(
    query: GetUserKeywordsListQuery,
  ): Promise<GetUserKeywordsListQueryResponse> {
    const { domainId, page, localizationId, searchText, device, userId, take } =
      query;

    const skip = (page - 1) * take;

    const data = await this.userKeywordsListRepository.findAllUserKeywords(
      userId,
      take,
      skip,
      searchText,
      localizationId,
      device,
      domainId,
    );

    const total =
      await this.userKeywordsListRepository.countAllWithSearchParams(
        userId,
        searchText,
        localizationId,
        device,
        domainId,
      );

    const userTotal =
      await this.userKeywordsListRepository.countAllForUser(userId);

    return {
      data,
      total,
      userTotal,
    };
  }
}
