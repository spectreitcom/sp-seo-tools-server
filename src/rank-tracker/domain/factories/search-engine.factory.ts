import { SearchEngine } from '../search-engine';
import { randomUUID } from 'crypto';

export class SearchEngineFactory {
  static create(
    engineName: string,
    seSearchEngineId: string,
    engineKey: string,
  ) {
    return new SearchEngine(
      randomUUID(),
      engineName,
      seSearchEngineId,
      engineKey,
    );
  }
}
