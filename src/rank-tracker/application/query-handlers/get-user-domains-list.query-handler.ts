import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDomainsListQuery } from '../queries/get-user-domains-list.query';
import { CollectionData } from '../../../shared/types/collection.data';
import { UserDomainsListItemDto } from '../dto/user-domains-list-item.dto';
import { UserDomainsListRepository } from '../ports/user-domains-list.repository';

export type GetUserDomainsListQueryResponse =
  CollectionData<UserDomainsListItemDto>;

@QueryHandler(GetUserDomainsListQuery)
export class GetUserDomainsListQueryHandler
  implements
    IQueryHandler<GetUserDomainsListQuery, GetUserDomainsListQueryResponse>
{
  constructor(
    private readonly userDomainsListRepository: UserDomainsListRepository,
  ) {}

  async execute(
    query: GetUserDomainsListQuery,
  ): Promise<GetUserDomainsListQueryResponse> {
    const { searchText, page, userId } = query;

    const take = 30;
    const skip = take * (page - 1);

    const data = await this.userDomainsListRepository.findAll(
      userId,
      take,
      skip,
      searchText,
    );

    const total = await this.userDomainsListRepository.countAll(
      userId,
      searchText,
    );

    const userTotal =
      await this.userDomainsListRepository.countAllForUser(userId);

    return { data, total, userTotal };
  }
}
