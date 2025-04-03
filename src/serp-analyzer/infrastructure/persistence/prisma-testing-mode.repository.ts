import { Injectable } from '@nestjs/common';
import { TestingModeRepository } from '../../application/ports/testing-mode.repository';
import { DatabaseService } from '../../../database/database.service';
import { TestingMode } from '../../domain/testing-mode';
import * as moment from 'moment';
import { TestingModeMapper } from '../../domain/mappers/testing-mode.mapper';

@Injectable()
export class PrismaTestingModeRepository implements TestingModeRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(testingMode: TestingMode): Promise<void> {
    const testingModeModel =
      await this.databaseService.saTestingMode.findUnique({
        where: {
          id: testingMode.getTestingModeId(),
        },
      });

    if (testingModeModel) {
      await this.databaseService.saTestingMode.update({
        where: {
          id: testingMode.getTestingModeId(),
        },
        data: {
          userId: testingMode.getUserId(),
          active: testingMode.getActive(),
          expiresAt: testingMode.getExpiresAt().value,
          analysisPerMonth: testingMode.getAnalysisPerMonth(),
          searchedPages: testingMode.getSearchedPages(),
        },
      });
      return;
    }

    await this.databaseService.saTestingMode.create({
      data: {
        id: testingMode.getTestingModeId(),
        userId: testingMode.getUserId(),
        active: testingMode.getActive(),
        expiresAt: testingMode.getExpiresAt().value,
        analysisPerMonth: testingMode.getAnalysisPerMonth(),
        searchedPages: testingMode.getSearchedPages(),
        createdAt: moment().unix(),
      },
    });
  }

  async findByUser(userId: string): Promise<TestingMode> {
    const testingModeModel =
      await this.databaseService.saTestingMode.findUnique({
        where: {
          userId,
        },
      });

    if (!testingModeModel) return null;

    const userSubscriptionInfo =
      await this.databaseService.saUserSubscriptionInfo.findUnique({
        where: {
          userId: testingModeModel.userId,
        },
      });

    return TestingModeMapper.toDomain(
      testingModeModel,
      true,
      !!userSubscriptionInfo,
    );
  }
}
