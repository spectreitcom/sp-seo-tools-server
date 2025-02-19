import { Injectable } from '@nestjs/common';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { DomainPosition } from 'src/rank-tracker/domain/domain-position';
import { DatabaseService } from '../../../../database/database.service';

@Injectable()
export class PrismaDomainPositionRepository
  implements DomainPositionRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(domainPosition: DomainPosition): Promise<void> {
    const domainPositionModel =
      await this.databaseService.rtDomainPosition.findUnique({
        where: { id: domainPosition.domainPositionId },
      });

    if (domainPositionModel) {
      await this.databaseService.rtDomainPosition.update({
        where: { id: domainPosition.domainPositionId },
        data: {
          position: domainPosition.position,
          keywordId: domainPosition.keywordId,
          timestamp: domainPosition.timestamp,
        },
      });
      return;
    }

    await this.databaseService.rtDomainPosition.create({
      data: {
        id: domainPosition.domainPositionId,
        position: domainPosition.position,
        keywordId: domainPosition.keywordId,
        timestamp: domainPosition.timestamp,
      },
    });
  }
}
