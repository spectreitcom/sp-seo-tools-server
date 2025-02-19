import { SearchEngine } from '../../domain/search-engine';

export abstract class SearchEngineRepository {
  abstract save(searchEngine: SearchEngine): Promise<void>;
  abstract findBySeSearchEngineId(
    seSearchEngineId: string,
  ): Promise<SearchEngine>;
  abstract findById(searchEngineId: string): Promise<SearchEngine>;
}
