import { Injectable } from '@nestjs/common';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { DomainPosition } from 'src/rank-tracker/domain/domain-position';
import { DatabaseService } from '../../../../database/database.service';
import { PrismaClient, RtDomainPositionStaus } from '@prisma/client';
import { DomainPositionMapper } from '../../../domain/mappers/domain-position.mapper';

@Injectable()
export class PrismaDomainPositionRepository
  implements DomainPositionRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(
    domainPosition: DomainPosition,
    prisma?: PrismaClient,
  ): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;

    const domainPositionModel = await prismaClient.rtDomainPosition.findUnique({
      where: { id: domainPosition.getDomainPositionId() },
    });

    if (domainPositionModel) {
      await prismaClient.rtDomainPosition.update({
        where: { id: domainPosition.getDomainPositionId() },
        data: {
          position: domainPosition.getPosition(),
          keywordId: domainPosition.getKeywordId(),
          timestamp: domainPosition.getTimestamp(),
          processId: domainPosition.getProcessId(),
          status: domainPosition.getStatus(),
        },
      });
      return;
    }

    await prismaClient.rtDomainPosition.create({
      data: {
        id: domainPosition.getDomainPositionId(),
        position: domainPosition.getPosition(),
        keywordId: domainPosition.getKeywordId(),
        timestamp: domainPosition.getTimestamp(),
        processId: domainPosition.getProcessId(),
        status: domainPosition.getStatus(),
      },
    });
  }

  async findAll(
    take: number,
    skip: number,
    status: RtDomainPositionStaus | undefined,
  ): Promise<DomainPosition[]> {
    const models = await this.databaseService.rtDomainPosition.findMany({
      where: {
        status,
      },
      take,
      skip,
    });
    if (!models.length) return [];
    return models.map((model) => DomainPositionMapper.toDomain(model));
  }

  async findAllByKeywordK(
    keywordId: string,
    take: number,
    skip: number,
    status: RtDomainPositionStaus | undefined = undefined,
  ): Promise<DomainPosition[]> {
    const models = await this.databaseService.rtDomainPosition.findMany({
      where: {
        keywordId,
        status,
      },
      take,
      skip,
      orderBy: {
        timestamp: 'desc',
      },
    });
    if (!models.length) return [];
    return models.map((model) => DomainPositionMapper.toDomain(model));
  }
}
