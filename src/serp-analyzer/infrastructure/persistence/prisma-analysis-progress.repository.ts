import { Injectable } from '@nestjs/common';
import { AnalysisProgressRepository } from '../../application/ports/analysis-progress.repository';
import { AnalysisProgress } from 'src/serp-analyzer/domain/analysis-progress';
import { DatabaseService } from '../../../database/database.service';
import { AnalysisProgressMapper } from '../../domain/mappers/analysis-progress.mapper';

@Injectable()
export class PrismaAnalysisProgressRepository
  implements AnalysisProgressRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(analysisProgress: AnalysisProgress): Promise<void> {
    const analysisProgressModel =
      await this.databaseService.saAnalysisProgress.findUnique({
        where: {
          id: analysisProgress.getAnalysisProgressId(),
        },
      });

    if (analysisProgressModel) {
      await this.databaseService.saAnalysisProgress.update({
        where: {
          id: analysisProgress.getAnalysisProgressId(),
        },
        data: {
          analysisId: analysisProgress.getAnalysisId(),
          total: analysisProgress.getTotal(),
          current: analysisProgress.getCurrent(),
        },
      });
      return;
    }

    await this.databaseService.saAnalysisProgress.create({
      data: {
        id: analysisProgress.getAnalysisProgressId(),
        analysisId: analysisProgress.getAnalysisId(),
        total: analysisProgress.getTotal(),
        current: analysisProgress.getCurrent(),
      },
    });
  }

  async findByAnalysis(analysisId: string): Promise<AnalysisProgress> {
    const model = await this.databaseService.saAnalysisProgress.findUnique({
      where: {
        analysisId,
      },
    });
    if (!model) return null;
    return AnalysisProgressMapper.toDomain(model);
  }

  async findByAnalysisAndUser(
    analysisId: string,
    userId: string,
  ): Promise<AnalysisProgress> {
    const model = await this.databaseService.saAnalysisProgress.findUnique({
      where: {
        analysisId,
        analysis: {
          userId,
        },
      },
    });
    if (!model) return null;
    return AnalysisProgressMapper.toDomain(model);
  }
}
