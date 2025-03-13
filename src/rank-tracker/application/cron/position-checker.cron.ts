import { Injectable } from '@nestjs/common';
import { CronServiceInterface } from '../../../shared/types/cron-service.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PositionCheckerQueueService } from '../ports/position-checker-queue.service';

@Injectable()
export class PositionCheckerCron implements CronServiceInterface {
  constructor(
    private readonly positionCheckerQueueService: PositionCheckerQueueService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handle() {
    this.positionCheckerQueueService.checkPositions();
  }
}
