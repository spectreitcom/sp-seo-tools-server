import { Injectable } from '@nestjs/common';
import { CronServiceInterface } from '../../../shared/types/cron-service.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DomainPositionProcessingQueueService } from '../ports/domain-position-processing-queue.service';

@Injectable()
export class DomainPositionProcessingCron implements CronServiceInterface {
  constructor(
    private readonly domainPositionProcessingQueueService: DomainPositionProcessingQueueService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handle() {
    await this.domainPositionProcessingQueueService.processPositions();
  }
}
