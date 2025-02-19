import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';

export abstract class SearchEnginesListRepository {
  abstract findAll(): Promise<SearchEnginesListItemDto[]>;
}
