import { Injectable } from '@nestjs/common';
import { AnalysisRepository } from '../../application/ports/analysis.repository';
import { DatabaseService } from '../../../database/database.service';
import { Analysis } from '../../domain/analysis';
import * as moment from 'moment';
import { AnalysisMapper } from '../../domain/mappers/analysis.mapper';

@Injectable()
export class PrismaAnalysisRepository implements AnalysisRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(analysis: Analysis): Promise<void> {
    const analysisModel = await this.databaseService.saAnalysis.findUnique({
      where: {
        id: analysis.getAnalysisId(),
      },
    });

    if (analysisModel) {
      await this.databaseService.saAnalysis.update({
        where: {
          id: analysis.getAnalysisId(),
        },
        data: {
          device: analysis.getDevice(),
          keyword: analysis.getKeyword(),
          localizationId: analysis.getLocalizationId(),
          processId: analysis.getProcessId(),
          userId: analysis.getUserId(),
          error: analysis.getError(),
        },
      });
      return;
    }

    await this.databaseService.saAnalysis.create({
      data: {
        id: analysis.getAnalysisId(),
        device: analysis.getDevice(),
        keyword: analysis.getKeyword(),
        localizationId: analysis.getLocalizationId(),
        processId: analysis.getProcessId(),
        createdAt: moment().unix(),
        userId: analysis.getUserId(),
        error: analysis.getError(),
      },
    });
  }

  async findById(analysisId: string): Promise<Analysis> {
    const model = await this.databaseService.saAnalysis.findUnique({
      where: { id: analysisId },
    });
    if (!model) return null;

    const testingModeModel =
      await this.databaseService.saTestingMode.findUnique({
        where: { userId: model.userId },
      });

    const userSubscriptionInfoModel =
      await this.databaseService.saUserSubscriptionInfo.findUnique({
        where: {
          userId: model.userId,
        },
      });

    const hasActiveTestingMode = testingModeModel
      ? testingModeModel.active
      : false;
    const hasActiveSubscription = userSubscriptionInfoModel
      ? userSubscriptionInfoModel.active
      : false;
    const exceededMonthlyLimit = await this.exceededMonthlyLimit(model.userId);

    return AnalysisMapper.toDomain(
      model,
      hasActiveTestingMode,
      hasActiveSubscription,
      exceededMonthlyLimit,
    );
  }

  async exceededMonthlyLimit(userId: string): Promise<boolean> {
    const testingModeModel =
      await this.databaseService.saTestingMode.findUnique({
        where: { userId: userId },
      });

    const userSubscriptionInfoModel =
      await this.databaseService.saUserSubscriptionInfo.findUnique({
        where: {
          userId: userId,
        },
      });

    const [fromDateMoment, toDateMoment] = this.getDateRangeForCurrentMonth();

    const total = await this.databaseService.saAnalysis.count({
      where: {
        userId: userId,
        createdAt: {
          gte: fromDateMoment.unix(),
          lte: toDateMoment.unix(),
        },
      },
    });

    if (
      userSubscriptionInfoModel?.active &&
      total >= userSubscriptionInfoModel.analysisPerMonth
    )
      return true;

    return (
      testingModeModel?.active && total >= testingModeModel.analysisPerMonth
    );
  }

  async getUsedQuotaInCurrentMonth(userId: string): Promise<number> {
    const [fromDateMoment, toDateMoment] = this.getDateRangeForCurrentMonth();
    return this.databaseService.saAnalysis.count({
      where: {
        userId: userId,
        createdAt: {
          gte: fromDateMoment.unix(),
          lte: toDateMoment.unix(),
        },
      },
    });
  }

  private getDateRangeForCurrentMonth() {
    const nowMoment = moment();

    const fromDateMoment = nowMoment.clone().set({
      M: nowMoment.get('month'),
      D: 1,
      h: 0,
      minute: 0,
      second: 0,
    });

    const toDateMoment = nowMoment.clone().set({
      h: 23,
      minute: 59,
      second: 59,
      M: nowMoment.get('month'),
      D: nowMoment.daysInMonth(),
    });

    return [fromDateMoment, toDateMoment];
  }

  async hasAnalysisErrors(analysisId: string): Promise<boolean> {
    const model = await this.databaseService.saAnalysis.findUnique({
      where: { id: analysisId },
    });
    if (!model) return false;
    const stagesWithErrorCount = await this.databaseService.saStage.count({
      where: {
        status: 'ERROR',
        page: {
          analysisId,
        },
      },
    });
    return stagesWithErrorCount > 0 || model.error;
  }
}
