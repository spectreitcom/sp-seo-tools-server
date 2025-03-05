import { SearchEnginesListItemDto } from '../dto/search-engines-list-item.dto';

export abstract class SearchEnginesListRepository {
  abstract findAll(): Promise<SearchEnginesListItemDto[]>;
  abstract findByEngineKey(
    engineKey: string,
  ): Promise<SearchEnginesListItemDto | null>;
}
