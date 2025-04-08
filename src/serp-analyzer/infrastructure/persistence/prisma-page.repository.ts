import { Injectable } from '@nestjs/common';
import { PageRepository } from '../../application/ports/page.repository';
import { Page } from '../../domain/page';
import { DatabaseService } from '../../../database/database.service';
import { SaStage } from '@prisma/client';
import { PageMapper } from '../../domain/mappers/page.mapper';

@Injectable()
export class PrismaPageRepository implements PageRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(page: Page): Promise<void> {
    const pageModel = await this.databaseService.saPage.findUnique({
      where: { id: page.getPageId() },
    });

    if (pageModel) {
      await this.databaseService.$transaction(async (prisma) => {
        await prisma.saPage.update({
          where: { id: page.getPageId() },
          data: {
            url: page.getUrl(),
            analysisId: page.getAnalysisId(),
            position: page.getPosition(),
            html: page.getHtml(),
          },
        });

        const stageModels = await prisma.saStage.findMany({
          where: { id: page.getPageId() },
        });

        const existingStages = stageModels.map(
          (stageModel) => stageModel.stage,
        );

        const stagesToCreate: string[] = [];
        const stagesToRemove: SaStage[] = [];

        for (const stageModel of stageModels) {
          if (!page.getStages().includes(stageModel.stage)) {
            stagesToRemove.push(stageModel);
          }
        }

        for (const stage of page.getStages()) {
          if (!existingStages.includes(stage)) {
            stagesToCreate.push(stage);
          }
        }

        await prisma.saStage.createMany({
          data: stagesToCreate.map((stage) => ({
            pageId: page.getPageId(),
            stage,
          })),
        });

        await prisma.saStage.deleteMany({
          where: {
            id: {
              in: stagesToRemove.map((item) => item.id),
            },
          },
        });
      });

      return;
    }

    // creating
    await this.databaseService.$transaction(async (prisma) => {
      await prisma.saPage.create({
        data: {
          id: page.getPageId(),
          url: page.getUrl(),
          analysisId: page.getAnalysisId(),
          position: page.getPosition(),
          html: page.getHtml(),
        },
      });

      await prisma.saStage.createMany({
        data: page.getStages().map((stage) => ({
          pageId: page.getPageId(),
          stage: stage,
        })),
      });
    });
  }

  async saveMany(pages: Page[]): Promise<void> {
    await this.databaseService.$transaction(async (prisma) => {
      const pageModels = await prisma.saPage.findMany({
        where: {
          id: {
            in: pages.map((page) => page.getPageId()),
          },
        },
      });

      const existingPageModelsIds = pageModels.map((pageModel) => pageModel.id);

      const pagesToUpdate: Page[] = [];
      const pagesToCreate: Page[] = [];

      for (const page of pages) {
        if (existingPageModelsIds.includes(page.getPageId())) {
          pagesToUpdate.push(page);
        } else {
          pagesToCreate.push(page);
        }
      }

      for (const pageToUpdate of pagesToUpdate) {
        await prisma.saPage.update({
          where: { id: pageToUpdate.getPageId() },
          data: {
            url: pageToUpdate.getUrl(),
            analysisId: pageToUpdate.getAnalysisId(),
            position: pageToUpdate.getPosition(),
            html: pageToUpdate.getHtml(),
          },
        });
      }

      await prisma.saPage.createMany({
        data: pagesToCreate.map((pageToCreate) => ({
          id: pageToCreate.getPageId(),
          url: pageToCreate.getUrl(),
          analysisId: pageToCreate.getAnalysisId(),
          position: pageToCreate.getPosition(),
          html: pageToCreate.getHtml(),
        })),
      });

      for (const pageToCreate of pagesToCreate) {
        await prisma.saStage.createMany({
          data: pageToCreate.getStages().map((stage) => ({
            pageId: pageToCreate.getPageId(),
            stage,
          })),
        });
      }

      for (const pageToUpdate of pagesToUpdate) {
        const stageModels = await prisma.saStage.findMany({
          where: { pageId: pageToUpdate.getPageId() },
        });
        const existingStages = stageModels.map(
          (stageModel) => stageModel.stage,
        );

        const stagesToCreate: string[] = [];
        const stagesToRemove: SaStage[] = [];

        for (const stageModel of stageModels) {
          if (!pageToUpdate.getStages().includes(stageModel.stage)) {
            stagesToRemove.push(stageModel);
          }
        }
        for (const stage of pageToUpdate.getStages()) {
          if (!existingStages.includes(stage)) {
            stagesToCreate.push(stage);
          }
        }

        await prisma.saStage.createMany({
          data: stagesToCreate.map((stage) => ({
            pageId: pageToUpdate.getPageId(),
            stage,
          })),
        });

        await prisma.saStage.deleteMany({
          where: {
            id: {
              in: stagesToRemove.map((item) => item.id),
            },
          },
        });
      }
    });
  }

  async findById(pageId: string): Promise<Page> {
    const model = await this.databaseService.saPage.findUnique({
      where: { id: pageId },
    });
    if (!model) return null;
    const stages = await this.databaseService.saStage.findMany({
      where: {
        pageId,
      },
    });
    return PageMapper.toDomain(
      model,
      stages.map((stage) => stage.stage),
    );
  }

  async findByStageId(stageId: string): Promise<Page> {
    const stageModel = await this.databaseService.saStage.findUnique({
      where: { id: stageId },
      include: {
        page: true,
      },
    });

    if (!stageModel) return null;

    const stageModels = await this.databaseService.saStage.findMany({
      where: {
        pageId: stageModel.pageId,
      },
    });

    return PageMapper.toDomain(
      stageModel.page,
      stageModels.map((stage) => stage.stage),
    );
  }
}
