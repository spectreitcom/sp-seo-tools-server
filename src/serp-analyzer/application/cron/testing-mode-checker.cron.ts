import { Injectable } from '@nestjs/common';
import { CronServiceInterface } from '../../../shared/types/cron-service.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TestingModeCheckerQueueService } from '../ports/testing-mode-checker-queue.service';

@Injectable()
export class TestingModeCheckerCron implements CronServiceInterface {
  constructor(
    private readonly testingModeCheckerQueueService: TestingModeCheckerQueueService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handle() {
    await this.testingModeCheckerQueueService.checkTestingModes();
  }
}
