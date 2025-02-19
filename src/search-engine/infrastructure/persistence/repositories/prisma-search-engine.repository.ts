import { Injectable } from '@nestjs/common';
import { SearchEngineRepository } from '../../../application/ports/search-engine.repository';
import { SearchEngine } from 'src/search-engine/domain/search-engine';
import { DatabaseService } from '../../../../database/database.service';
import { ESearchEngine } from '@prisma/client';

@Injectable()
export class PrismaSearchEngineRepository implements SearchEngineRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(searchEngine: SearchEngine): Promise<void> {
    const searchEngineModel =
      await this.databaseService.seSearchEngine.findFirst({
        where: {
          id: searchEngine.searchEngineId,
        },
      });

    if (searchEngineModel) {
      await this.databaseService.seSearchEngine.update({
        where: { id: searchEngine.searchEngineId },
        data: {
          engineKey: searchEngine.engineKey.value,
          name: searchEngine.engineKey.value,
        },
      });
      return;
    }

    await this.databaseService.seSearchEngine.create({
      data: {
        id: searchEngine.searchEngineId,
        engineKey: searchEngine.engineKey.value,
        name: searchEngine.searchEngineName,
      },
    });
  }

  async searchEngineExists(engineKey: ESearchEngine): Promise<boolean> {
    const searchEngineModel =
      await this.databaseService.seSearchEngine.findFirst({
        where: {
          engineKey,
        },
      });
    return !!searchEngineModel;
  }
}
