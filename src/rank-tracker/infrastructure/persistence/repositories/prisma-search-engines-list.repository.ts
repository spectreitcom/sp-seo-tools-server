import { Injectable } from '@nestjs/common';
import { SearchEnginesListRepository } from '../../../application/ports/search-engines-list.repository';
import { SearchEnginesListItemDto } from 'src/rank-tracker/application/dto/search-engines-list-item.dto';
import { DatabaseService } from '../../../../database/database.service';

@Injectable()
export class PrismaSearchEnginesListRepository
  implements SearchEnginesListRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<SearchEnginesListItemDto[]> {
    const models = await this.databaseService.rtSearchEngine.findMany();
    return models.map(
      (model) => new SearchEnginesListItemDto(model.id, model.engineName),
    );
  }
}
