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

  async findAllActive(take: number, skip: number): Promise<TestingMode[]> {
    const testingModeModels = await this.databaseService.saTestingMode.findMany(
      {
        where: {
          active: true,
        },
        take,
        skip,
      },
    );
    if (!testingModeModels) return [];

    const userIds: string[] = [];

    for (const testingModeModel of testingModeModels) {
      if (!userIds.includes(testingModeModel.userId)) {
        userIds.push(testingModeModel.userId);
      }
    }

    const subscriptionInfos =
      await this.databaseService.saUserSubscriptionInfo.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });

    const testingModes: TestingMode[] = [];

    for (const testingModeModel of testingModeModels) {
      const subscriptionInfo = subscriptionInfos.find(
        (si) => si.userId == testingModeModel.userId,
      );
      testingModes.push(
        TestingModeMapper.toDomain(testingModeModel, true, !!subscriptionInfo),
      );
    }

    return testingModes;
  }
}
