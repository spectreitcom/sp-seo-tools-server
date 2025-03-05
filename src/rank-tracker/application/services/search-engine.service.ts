import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllAvailableForUserSearchEnginesQuery } from '../queries/get-all-available-for-user-search-engines.query';
import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';

@Injectable()
export class SearchEngineService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllAvailableForUserSearchEngines(userId: string) {
    return this.queryBus.execute<
      GetAllAvailableForUserSearchEnginesQuery,
      SearchEnginesListItemDto[]
    >(new GetAllAvailableForUserSearchEnginesQuery(userId));
  }
}
