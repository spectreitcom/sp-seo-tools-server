import { Injectable } from '@nestjs/common';
import { SearchEngineRepository } from '../../../application/ports/search-engine.repository';
import { DatabaseService } from '../../../../database/database.service';
import { SearchEngine } from '../../../domain/search-engine';
import { SearchEngineMapper } from '../../../domain/mappers/search-engine.mapper';

@Injectable()
export class PrismaSearchEngineRepository implements SearchEngineRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(searchEngine: SearchEngine): Promise<void> {
    const searchEngineModel =
      await this.databaseService.rtSearchEngine.findFirst({
        where: { id: searchEngine.searchEngineId },
      });

    if (searchEngineModel) {
      await this.databaseService.rtSearchEngine.update({
        where: { id: searchEngine.seSearchEngineId },
        data: {
          engineKey: searchEngine.engineKey,
          engineName: searchEngine.engineName,
          seSearchEngineId: searchEngine.seSearchEngineId,
        },
      });
      return;
    }

    await this.databaseService.rtSearchEngine.create({
      data: {
        id: searchEngine.seSearchEngineId,
        seSearchEngineId: searchEngine.seSearchEngineId,
        engineKey: searchEngine.engineKey,
        engineName: searchEngine.engineName,
      },
    });
  }

  async findBySeSearchEngineId(
    seSearchEngineId: string,
  ): Promise<SearchEngine> {
    const searchEngineModel =
      await this.databaseService.rtSearchEngine.findFirst({
        where: { seSearchEngineId: seSearchEngineId },
      });

    if (!searchEngineModel) return null;

    return SearchEngineMapper.toDomain(searchEngineModel);
  }

  async findById(searchEngineId: string): Promise<SearchEngine> {
    const searchEngineModel =
      await this.databaseService.rtSearchEngine.findUnique({
        where: {
          id: searchEngineId,
        },
      });

    if (!searchEngineModel) return null;

    return SearchEngineMapper.toDomain(searchEngineModel);
  }
}
