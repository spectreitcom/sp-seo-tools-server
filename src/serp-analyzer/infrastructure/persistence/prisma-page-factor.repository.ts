import { Injectable } from '@nestjs/common';
import { PageFactorRepository } from '../../application/ports/page-factor.repository';
import { PageFactor } from '../../domain/page-factor';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class PrismaPageFactorRepository implements PageFactorRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(pageFactor: PageFactor): Promise<void> {
    const pageFactorModel = await this.databaseService.saPageFactor.findUnique({
      where: {
        id: pageFactor.getPageFactorId(),
      },
    });

    if (pageFactorModel) {
      await this.databaseService.saPageFactor.update({
        where: { id: pageFactor.getPageFactorId() },
        data: {
          pageId: pageFactor.getPageId(),
          factor: pageFactor.getFactor(),
          value: pageFactor.getValue(),
        },
      });
      return;
    }

    await this.databaseService.saPageFactor.create({
      data: {
        id: pageFactor.getPageFactorId(),
        pageId: pageFactor.getPageId(),
        factor: pageFactor.getFactor(),
        value: pageFactor.getValue(),
      },
    });
  }

  async saveMany(pageFactors: PageFactor[]): Promise<void> {
    const pageModelsFactors = await this.databaseService.saPageFactor.findMany({
      where: {
        id: {
          in: pageFactors.map((pageFactor) => pageFactor.getPageFactorId()),
        },
      },
    });

    const existingPageFactorIds = pageModelsFactors.map(
      (pageFactor) => pageFactor.id,
    );

    const pageFactorsToCreate: PageFactor[] = [];

    for (const pageFactor of pageFactors) {
      if (!existingPageFactorIds.includes(pageFactor.getPageFactorId())) {
        pageFactorsToCreate.push(pageFactor);
      }
    }

    await this.databaseService.saPageFactor.createMany({
      data: pageFactorsToCreate.map((item) => ({
        id: item.getPageFactorId(),
        pageId: item.getPageId(),
        factor: item.getFactor(),
        value: item.getValue(),
      })),
    });
  }
}
