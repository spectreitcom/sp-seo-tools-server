import { Injectable } from '@nestjs/common';
import { CronServiceInterface } from '../../../shared/types/cron-service.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckingQueryQueueService } from '../ports/checking-query-queue.service';

@Injectable()
export class CheckingQueryCron implements CronServiceInterface {
  constructor(
    private readonly checkingQueryQueueService: CheckingQueryQueueService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handle() {
    this.checkingQueryQueueService.checkQueries();
  }
}
