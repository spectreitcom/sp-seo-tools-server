import { Injectable } from '@nestjs/common';
import { StageRepository } from '../../application/ports/stage.repository';
import { Stage } from '../../domain/stage';
import { DatabaseService } from '../../../database/database.service';
import { StageMapper } from '../../domain/mappers/stage.mapper';

@Injectable()
export class PrismaStageRepository implements StageRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(stage: Stage): Promise<void> {
    const stageModel = await this.databaseService.saStage.findUnique({
      where: {
        id: stage.getStageId(),
      },
    });

    if (stageModel) {
      await this.databaseService.saStage.update({
        where: {
          id: stage.getStageId(),
        },
        data: {
          stage: stage.getStage(),
          pageId: stage.getPageId(),
          status: stage.getStatus(),
        },
      });
      return;
    }

    await this.databaseService.saStage.create({
      data: {
        id: stage.getStageId(),
        stage: stage.getStage(),
        pageId: stage.getPageId(),
        status: stage.getStatus(),
      },
    });
  }

  async findById(stageId: string): Promise<Stage> {
    const model = await this.databaseService.saStage.findUnique({
      where: { id: stageId },
    });
    if (!model) return null;
    return StageMapper.toDomain(model);
  }

  async findAllCreated(pageIds: string[]): Promise<Stage[]> {
    const models = await this.databaseService.saStage.findMany({
      where: {
        pageId: {
          in: pageIds,
        },
      },
    });
    return models.map((model) => StageMapper.toDomain(model));
  }
}
