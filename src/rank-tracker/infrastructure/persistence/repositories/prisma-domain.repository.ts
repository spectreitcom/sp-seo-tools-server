import { Domain } from 'src/rank-tracker/domain/domain';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../database/database.service';
import { DomainMapper } from '../../../domain/mappers/domain.mapper';

@Injectable()
export class PrismaDomainRepository implements DomainRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(domain: Domain): Promise<void> {
    const rtDomain = await this.databaseService.rtDomain.findFirst({
      where: { id: domain.domainId },
    });

    if (rtDomain) {
      await this.databaseService.rtDomain.update({
        where: { id: domain.domainId },
        data: {
          text: domain.text,
        },
      });
      return;
    }

    await this.databaseService.rtDomain.create({
      data: {
        id: domain.domainId,
        userId: domain.userId,
        text: domain.text,
        createdAt: domain.createdAt,
      },
    });
  }

  async findById(domainId: string): Promise<Domain> {
    const rtDomain = await this.databaseService.rtDomain.findFirst({
      where: { id: domainId },
    });
    if (!rtDomain) return null;
    return DomainMapper.toDomain(rtDomain);
  }

  async domainExists(domainText: string, userId: string): Promise<boolean> {
    const rtDomain = await this.databaseService.rtDomain.findFirst({
      where: {
        userId: userId,
        text: domainText,
      },
    });
    return !!rtDomain;
  }

  async remove(domainId: string): Promise<void> {
    await this.databaseService.rtDomain.delete({
      where: { id: domainId },
    });
  }
}
