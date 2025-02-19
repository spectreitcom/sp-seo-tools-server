import { Injectable } from '@nestjs/common';
import { CronServiceInterface } from '../../../shared/types/cron-service.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TestingModeCheckerQueueService } from '../ports/testing-mode-checker-queue.service';

@Injectable()
export class TestingModeCheckerCron implements CronServiceInterface {
  constructor(
    private readonly testingModeCheckerQueueService: TestingModeCheckerQueueService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handle() {
    this.testingModeCheckerQueueService.checkTestingModes();
  }
}
