import { Injectable } from '@nestjs/common';
import { QueryRepository } from '../../application/ports/query.repository';
import { Query } from '../../domain/query';
import { DatabaseService } from '../../../database/database.service';
import * as moment from 'moment';
import { QueryMapper } from '../../domain/mappers/query.mapper';

@Injectable()
export class PrismaQueryRepository implements QueryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(query: Query): Promise<void> {
    const queryModel = await this.databaseService.gsQuery.findUnique({
      where: {
        id: query.getQueryId(),
      },
    });

    if (queryModel) {
      await this.databaseService.gsQuery.update({
        where: {
          id: query.getQueryId(),
        },
        data: {
          query: query.getQuery(),
          processId: query.getProcessId(),
          device: query.getDevice(),
          metadata: query.getMetadata(),
          resultsNumber: query.getResultsNumber(),
          localizationCode: query.getLocalizationCode(),
          results: query.getResults(),
          status: query.getStatus(),
          createdAt: moment().unix(),
          userId: query.getUserId(),
        },
      });
      return;
    }

    await this.databaseService.gsQuery.create({
      data: {
        id: query.getQueryId(),
        query: query.getQuery(),
        processId: query.getProcessId(),
        device: query.getDevice(),
        metadata: query.getMetadata(),
        resultsNumber: query.getResultsNumber(),
        localizationCode: query.getLocalizationCode(),
        results: query.getResults(),
        status: query.getStatus(),
        createdAt: moment().unix(),
        userId: query.getUserId(),
      },
    });
  }

  async findAllPending(take: number, skip: number): Promise<Query[]> {
    const models = await this.databaseService.gsQuery.findMany({
      where: { status: 'PENDING' },
      take,
      skip,
    });
    if (!models.length) return [];
    return models.map((model) => QueryMapper.toDomain(model));
  }

  async findByProcess(processId: string): Promise<Query> {
    const model = await this.databaseService.gsQuery.findUnique({
      where: { processId },
    });
    if (!model) return null;
    return QueryMapper.toDomain(model);
  }
}
