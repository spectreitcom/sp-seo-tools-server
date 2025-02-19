import { SearchEngine } from '../../domain/search-engine';
import { ESearchEngine } from '@prisma/client';

export abstract class SearchEngineRepository {
  abstract save(searchEngine: SearchEngine): Promise<void>;
  abstract searchEngineExists(engineKey: ESearchEngine): Promise<boolean>;
}
