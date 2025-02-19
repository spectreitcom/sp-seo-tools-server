import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllSearchEnginesQuery } from '../queries/get-all-search-engines.query';
import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';

@Injectable()
export class SearchEngineService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllSearchEngines() {
    return this.queryBus.execute<
      GetAllSearchEnginesQuery,
      SearchEnginesListItemDto[]
    >(new GetAllSearchEnginesQuery());
  }
}
