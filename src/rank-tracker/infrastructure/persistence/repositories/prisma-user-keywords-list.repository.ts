import { Injectable } from '@nestjs/common';
import { UserKeywordsListRepository } from '../../../application/ports/user-keywords-list.repository';
import { UserKeywordsListItemDto } from '../../../application/dto/user-keywords-list-item.dto';
import { DatabaseService } from '../../../../database/database.service';
import { DeviceMapper } from '../../device.mapper';
import { RtDomainPosition } from '@prisma/client';

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
    device: string | undefined,
    domainId: string | null | undefined,
  ): Promise<UserKeywordsListItemDto[]> {
    const models = await this.databaseService.rtKeyword.findMany({
      where: {
        domain: {
          userId,
        },
        AND: [
          {
            text: {
              startsWith: searchText,
              mode: 'insensitive',
            },
            device,
            localizationId,
            domainId,
          },
        ],
      },
      include: {
        localization: true,
        domain: true,
      },
      take,
      skip,
      orderBy: {
        timestamp: 'desc',
      },
    });

    const domainPositions =
      await this.databaseService.rtDomainPosition.findMany({
        where: {
          keywordId: {
            in: models.map((model) => model.id),
          },
          status: 'DONE',
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

    const results: UserKeywordsListItemDto[] = [];

    for (const model of models) {
      const _domainPositions = domainPositions.filter(
        (dp) => dp.keywordId === model.id,
      );

      let domainPosition: RtDomainPosition | null = null;

      for (const _domainPosition of _domainPositions) {
        if (!domainPosition) {
          domainPosition = _domainPosition;
          continue;
        }

        if (_domainPosition.timestamp > domainPosition.timestamp) {
          domainPosition = _domainPosition;
        }
      }

      results.push(
        new UserKeywordsListItemDto(
          model.id,
          model.text,
          domainPosition ? domainPosition.position : null,
          model.localization.countryCode,
          model.device,
          model.domain.text,
          model.localization.name,
          DeviceMapper.toName(model.device),
          model.growth,
        ),
      );
    }

    return results;
  }

  async findById(
    userId: string,
    keywordId: string,
  ): Promise<UserKeywordsListItemDto | null> {
    const keyword = await this.databaseService.rtKeyword.findUnique({
      where: {
        id: keywordId,
        domain: {
          userId,
        },
      },
      include: {
        localization: true,
        domain: true,
      },
    });

    if (!keyword) return null;

    const domainPosition =
      await this.databaseService.rtDomainPosition.findFirst({
        where: {
          keywordId: keyword.id,
          status: 'DONE',
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

    return new UserKeywordsListItemDto(
      keyword.id,
      keyword.text,
      domainPosition ? domainPosition.position : 0,
      keyword.localization.countryCode,
      keyword.device,
      keyword.domain.text,
      keyword.localization.name,
      DeviceMapper.toName(keyword.device),
      keyword.growth,
    );
  }

  async countAllWithSearchParams(
    userId: string,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    device: string | undefined,
    domainId: string | null | undefined,
  ): Promise<number> {
    return this.databaseService.rtKeyword.count({
      where: {
        domain: {
          userId,
        },
        AND: [
          {
            text: {
              startsWith: searchText,
              mode: 'insensitive',
            },
            device,
            localizationId,
            domainId,
          },
        ],
      },
    });
  }

  async countAllForUser(userId: string): Promise<number> {
    return this.databaseService.rtKeyword.count({
      where: {
        domain: {
          userId,
        },
      },
    });
  }
}
