import { Injectable } from '@nestjs/common';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { DomainPosition } from 'src/rank-tracker/domain/domain-position';
import { DatabaseService } from '../../../../database/database.service';
import { PrismaClient } from '@prisma/client';

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
      where: { id: domainPosition.domainPositionId },
    });

    if (domainPositionModel) {
      await prismaClient.rtDomainPosition.update({
        where: { id: domainPosition.domainPositionId },
        data: {
          position: domainPosition.position,
          keywordId: domainPosition.keywordId,
          timestamp: domainPosition.timestamp,
        },
      });
      return;
    }

    await prismaClient.rtDomainPosition.create({
      data: {
        id: domainPosition.domainPositionId,
        position: domainPosition.position,
        keywordId: domainPosition.keywordId,
        timestamp: domainPosition.timestamp,
      },
    });
  }
}
