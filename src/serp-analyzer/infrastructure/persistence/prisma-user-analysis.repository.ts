import { Injectable } from '@nestjs/common';
import { UserAnalysisRepository } from '../../application/ports/user-analysis.repository';
import { UserAnalysisReadModel } from '../read-models/user-analysis.read-model';
import { DatabaseService } from '../../../database/database.service';
import { DeviceMapper } from '../device.mapper';

@Injectable()
export class PrismaUserAnalysisRepository implements UserAnalysisRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllByUser(
    userId: string,
    take: number,
    skip: number,
    searchText: string,
    localizationId: string | undefined,
    device: string | undefined,
  ): Promise<UserAnalysisReadModel[]> {
    const models = await this.databaseService.saAnalysis.findMany({
      where: {
        userId,
        localizationId,
        device,
        keyword: {
          startsWith: searchText,
          mode: 'insensitive',
        },
      },
      take,
      skip,
      include: {
        localization: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!models.length) return [];

    const analysisProgressModels =
      await this.databaseService.saAnalysisProgress.findMany({
        where: {
          analysisId: {
            in: models.map((model) => model.id),
          },
        },
      });

    const results: UserAnalysisReadModel[] = [];

    for (const model of models) {
      const analysisProgressModel = analysisProgressModels.find(
        (progress) => progress.analysisId === model.id,
      );

      let progress = 0;

      if (analysisProgressModel) {
        progress = this.calcProgress(
          analysisProgressModel.current,
          analysisProgressModel.total,
        );
      }

      const stagesWithErrorCount = await this.databaseService.saStage.count({
        where: {
          status: 'ERROR',
          page: {
            analysisId: model.id,
          },
        },
      });

      results.push(
        new UserAnalysisReadModel(
          model.id,
          model.keyword,
          model.localization.name,
          model.localization.countryCode,
          DeviceMapper.toName(model.device),
          progress,
          stagesWithErrorCount > 0,
        ),
      );
    }

    return results;
  }

  private calcProgress(current: number, total: number) {
    if (total === 0) return 0;
    return Math.floor(current / total) * 100;
  }

  async countAllWithSearchParams(
    userId: string,
    searchText: string,
    localizationId: string | undefined,
    device: string | undefined,
  ): Promise<number> {
    return this.databaseService.saAnalysis.count({
      where: {
        userId,
        localizationId,
        device,
        keyword: {
          startsWith: searchText,
          mode: 'insensitive',
        },
      },
    });
  }

  async countAllForUser(userId: string): Promise<number> {
    return this.databaseService.saAnalysis.count({
      where: {
        userId,
      },
    });
  }

  async findByIdAndUser(
    analysisId: string,
    userId: string,
  ): Promise<UserAnalysisReadModel> {
    const model = await this.databaseService.saAnalysis.findUnique({
      where: { userId, id: analysisId },
      include: {
        localization: true,
      },
    });
    if (!model) return null;

    const analysisProgressModel =
      await this.databaseService.saAnalysisProgress.findUnique({
        where: {
          analysisId,
        },
      });

    const progress = this.calcProgress(
      analysisProgressModel.current,
      analysisProgressModel.total,
    );

    const stagesWithErrorCount = await this.databaseService.saStage.count({
      where: {
        status: 'ERROR',
        page: {
          analysisId,
        },
      },
    });

    return new UserAnalysisReadModel(
      model.id,
      model.keyword,
      model.localization.name,
      model.localization.countryCode,
      DeviceMapper.toName(model.device),
      progress,
      stagesWithErrorCount > 0,
    );
  }
}
