import { Injectable } from '@nestjs/common';
import { TestingModeRepository } from '../../../application/ports/testing-mode.repository';
import { TestingMode } from 'src/rank-tracker/domain/testing-mode';
import { DatabaseService } from '../../../../database/database.service';
import * as moment from 'moment';
import { TestingModeMapper } from '../../../domain/mappers/testing-mode.mapper';

@Injectable()
export class PrismaTestingModeRepository implements TestingModeRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(testingMode: TestingMode): Promise<void> {
    const testingModeModel =
      await this.databaseService.rtTestingMode.findUnique({
        where: {
          id: testingMode.getTestingModeId(),
        },
      });

    if (testingModeModel) {
      await this.databaseService.rtTestingMode.update({
        where: { id: testingMode.getTestingModeId() },
        data: {
          userId: testingMode.getUserId(),
          active: testingMode.getActive(),
          expiresAt: testingMode.getExpiresAt().value,
          maxKeywordsQty: testingMode.getMaxKeywordsQty(),
          maxSearchedPages: testingMode.getMaxSearchedPages(),
        },
      });
      return;
    }

    await this.databaseService.rtTestingMode.create({
      data: {
        id: testingMode.getTestingModeId(),
        userId: testingMode.getUserId(),
        active: testingMode.getActive(),
        expiresAt: testingMode.getExpiresAt().value,
        maxSearchedPages: testingMode.getMaxSearchedPages(),
        maxKeywordsQty: testingMode.getMaxKeywordsQty(),
        createdAt: moment().unix(),
      },
    });
  }

  async hasUserAlreadyActivated(userId: string): Promise<boolean> {
    const testingModeModel = await this.databaseService.rtTestingMode.findFirst(
      {
        where: {
          userId,
        },
      },
    );
    return !!testingModeModel;
  }

  async findAllActive(take: number, skip: number): Promise<TestingMode[]> {
    const testingModeModels = await this.databaseService.rtTestingMode.findMany(
      {
        where: {
          active: true,
        },
        take,
        skip,
      },
    );

    const testingModes: TestingMode[] = [];

    for (const testingModeModel of testingModeModels) {
      const subscriptionInfo =
        await this.databaseService.rtUserSubscriptionInfo.findFirst({
          where: {
            userId: testingModeModel.userId,
          },
        });

      testingModes.push(
        TestingModeMapper.toDomain(testingModeModel, true, !!subscriptionInfo),
      );
    }

    return testingModes;
  }

  async findByUserId(userId: string): Promise<TestingMode> {
    const testingModeModel =
      await this.databaseService.rtTestingMode.findUnique({
        where: { userId },
      });

    if (!testingModeModel) return null;

    const subscriptionInfo =
      await this.databaseService.rtUserSubscriptionInfo.findFirst({
        where: {
          userId,
        },
      });

    return TestingModeMapper.toDomain(
      testingModeModel,
      true,
      !!subscriptionInfo,
    );
  }
}
