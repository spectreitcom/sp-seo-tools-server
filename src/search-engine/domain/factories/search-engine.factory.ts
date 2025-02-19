import { SearchEngine } from '../search-engine';
import { randomUUID } from 'crypto';
import { ESearchEngine } from '@prisma/client';
import { EngineKey } from '../value-objects/engine-key';

export class SearchEngineFactory {
  static create(
    searchEngineName: string,
    engineKey: keyof typeof ESearchEngine,
  ) {
    const searchEngineId = randomUUID();
    const _engineKey = new EngineKey(engineKey);
    return new SearchEngine(searchEngineId, searchEngineName, _engineKey);
  }
}
