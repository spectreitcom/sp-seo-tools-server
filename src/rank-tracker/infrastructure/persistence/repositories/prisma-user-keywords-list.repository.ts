import { Injectable } from '@nestjs/common';
import { UserKeywordsListRepository } from '../../../application/ports/user-keywords-list.repository';
import { UserKeywordsListItemDto } from '../../../application/dto/user-keywords-list-item.dto';
import { DatabaseService } from '../../../../database/database.service';
import { DeviceMapper } from '../../device.mapper';

@Injectable()
export class PrismaUserKeywordsListRepository
  implements UserKeywordsListRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllUserKeywords(
    userId: string,
    take: number,
    skip: number,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    searchEngineId: string | null | undefined,
    device: string | null | undefined,
    domainId: string | null | undefined,
  ): Promise<UserKeywordsListItemDto[]> {
    const models = await this.databaseService.rtKeyword.findMany({
      where: {
        domain: {
          userId,
        },
        OR: [
          {
            text: {
              startsWith: searchText,
              mode: 'insensitive',
            },
          },
          {
            localizationId,
          },
          {
            searchEngineId,
          },
          {
            device,
          },
          {
            domainId,
          },
        ],
      },
      include: {
        localization: true,
        searchEngine: true,
        domain: true,
      },
      take,
      skip,
    });

    const results: UserKeywordsListItemDto[] = [];

    for (const model of models) {
      const domainPosition =
        await this.databaseService.rtDomainPosition.findFirst({
          where: {
            keywordId: model.id,
          },
          orderBy: {
            timestamp: 'desc',
          },
        });

      results.push(
        new UserKeywordsListItemDto(
          model.id,
          model.text,
          domainPosition.position,
          model.localization.countryCode,
          model.searchEngine.engineName,
          model.device,
          model.domain.text,
          model.localization.name,
          DeviceMapper.toName(model.device),
        ),
      );
    }

    return results;
  }

  async countAllUserKeywords(
    userId: string,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    searchEngineId: string | null | undefined,
    device: string | null | undefined,
    domainId: string | null | undefined,
  ): Promise<number> {
    return this.databaseService.rtKeyword.count({
      where: {
        domain: {
          userId,
        },
        OR: [
          {
            text: {
              startsWith: searchText,
              mode: 'insensitive',
            },
          },
          {
            localizationId,
          },
          {
            searchEngineId,
          },
          {
            device,
          },
          {
            domainId,
          },
        ],
      },
    });
  }
}
