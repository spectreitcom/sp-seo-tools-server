import { Injectable } from '@nestjs/common';
import { UserDomainsListRepository } from '../../../application/ports/user-domains-list.repository';
import { UserDomainsListItemDto } from 'src/rank-tracker/application/dto/user-domains-list-item.dto';
import { DatabaseService } from '../../../../database/database.service';

@Injectable()
export class PrismaUserDomainsListRepository
  implements UserDomainsListRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(
    userId: string,
    take: number,
    skip: number,
    searchText: string | null | undefined,
  ): Promise<UserDomainsListItemDto[]> {
    const models = await this.databaseService.rtDomain.findMany({
      where: {
        userId,
        text: {
          startsWith: searchText,
          mode: 'insensitive',
        },
      },
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const results: UserDomainsListItemDto[] = [];

    const keywordsCount = await this.databaseService.rtKeyword.groupBy({
      by: ['domainId'],
      where: {
        domainId: {
          in: models.map((model) => model.id),
        },
      },
      _count: true,
    });

    for (const model of models) {
      const keywordCount = keywordsCount.find((kc) => kc.domainId === model.id);

      results.push(
        new UserDomainsListItemDto(
          model.id,
          model.text,
          keywordCount?._count ?? 0,
        ),
      );
    }

    return results;
  }

  async findById(
    userId: string,
    domainId: string,
  ): Promise<UserDomainsListItemDto | null> {
    const model = await this.databaseService.rtDomain.findUnique({
      where: {
        id: domainId,
        userId,
      },
    });

    if (!model) return null;

    const keywordCount = await this.databaseService.rtKeyword.count({
      where: {
        domainId,
      },
    });

    return new UserDomainsListItemDto(model.id, model.text, keywordCount);
  }

  async countAllWithSearchParams(
    userId: string,
    searchText: string | null | undefined,
  ): Promise<number> {
    return this.databaseService.rtDomain.count({
      where: {
        userId,
        text: {
          startsWith: searchText,
          mode: 'insensitive',
        },
      },
    });
  }

  async countAllForUser(userId: string): Promise<number> {
    return this.databaseService.rtDomain.count({
      where: {
        userId,
      },
    });
  }
}
