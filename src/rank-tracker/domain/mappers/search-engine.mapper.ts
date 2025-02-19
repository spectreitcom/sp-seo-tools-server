import { RtSearchEngine } from '@prisma/client';
import { SearchEngine } from '../search-engine';

export class SearchEngineMapper {
  static toDomain(searchEngineModel: RtSearchEngine) {
    const searchEngineId = searchEngineModel.id;
    const engineName = searchEngineModel.engineName;
    const seSearchEngineId = searchEngineModel.seSearchEngineId;
    const engineKey = searchEngineModel.engineKey;
    return new SearchEngine(
      searchEngineId,
      engineName,
      seSearchEngineId,
      engineKey,
    );
  }
}
