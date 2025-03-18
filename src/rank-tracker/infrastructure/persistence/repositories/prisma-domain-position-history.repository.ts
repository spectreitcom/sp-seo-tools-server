import { Injectable } from '@nestjs/common';
import { DomainPositionHistoryRepository } from '../../../application/ports/domain-position-history.repository';
import { DomainPositionHistoryDto } from '../../../application/dto/domain-position-history.dto';
import { DatabaseService } from '../../../../database/database.service';
import * as moment from 'moment';

@Injectable()
export class PrismaDomainPositionHistoryRepository
  implements DomainPositionHistoryRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(
    keywordId: string,
    userId: string,
    skip: number,
    take: number,
    fromDate: number,
    toDate: number,
  ): Promise<DomainPositionHistoryDto[]> {
    const models = await this.databaseService.rtDomainPosition.findMany({
      where: {
        keyword: {
          id: keywordId,
          domain: {
            userId,
          },
        },
        timestamp: {
          gte: fromDate,
          lte: toDate,
        },
      },
      take,
      skip,
      orderBy: {
        timestamp: 'desc',
      },
    });

    return models.map(
      (model) =>
        new DomainPositionHistoryDto(
          model.id,
          moment(model.timestamp * 1000).format('YYYY-MM-DD'),
          model.position,
        ),
    );
  }

  async countAllWithSearchParams(
    keywordId: string,
    userId: string,
    fromDate: number,
    toDate: number,
  ): Promise<number> {
    return this.databaseService.rtDomainPosition.count({
      where: {
        keyword: {
          id: keywordId,
          domain: {
            userId,
          },
        },
        timestamp: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });
  }

  countAllForUser(keywordId: string, userId: string): Promise<number> {
    return this.databaseService.rtDomainPosition.count({
      where: {
        keyword: {
          id: keywordId,
          domain: {
            userId,
          },
        },
      },
    });
  }
}
