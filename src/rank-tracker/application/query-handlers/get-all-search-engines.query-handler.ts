import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSearchEnginesQuery } from '../queries/get-all-search-engines.query';
import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';
import { SearchEnginesListRepository } from '../ports/search-engines-list.repository';

@QueryHandler(GetAllSearchEnginesQuery)
export class GetAllSearchEnginesQueryHandler
  implements IQueryHandler<GetAllSearchEnginesQuery, SearchEnginesListItemDto[]>
{
  constructor(
    private readonly searchEnginesListRepository: SearchEnginesListRepository,
  ) {}

  async execute(
    _: GetAllSearchEnginesQuery,
  ): Promise<SearchEnginesListItemDto[]> {
    return this.searchEnginesListRepository.findAll();
  }
}
