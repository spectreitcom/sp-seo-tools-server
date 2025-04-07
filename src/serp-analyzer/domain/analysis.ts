import { AggregateRoot } from '@nestjs/cqrs';
import { AnalysisCreatedEvent } from './events/analysis-created.event';
import { AnalysisFinishedEvent } from './events/analysis-finished.event';
import { CreateAnalysisError } from './exceptions';

export class Analysis extends AggregateRoot {
  constructor(
    private analysisId: string,
    private keyword: string,
    private localizationId: string,
    private processId: string | null,
    private device: string,
    private userId: string,
    private hasActiveTestingMode: boolean,
    private hasActiveSubscription: boolean,
    private exceededMonthlyLimit: boolean,
  ) {
    super();
  }

  updateProcessId(processId: string) {
    this.processId = processId;
  }

  create() {
    if (
      (this.hasActiveTestingMode || this.hasActiveSubscription) &&
      !this.exceededMonthlyLimit
    ) {
      this.apply(new AnalysisCreatedEvent(this.analysisId));
      return;
    }
    throw new CreateAnalysisError();
  }

  finish() {
    this.apply(new AnalysisFinishedEvent(this.analysisId));
  }

  getAnalysisId() {
    return this.analysisId;
  }

  getKeyword() {
    return this.keyword;
  }

  getLocalizationId() {
    return this.localizationId;
  }

  getProcessId() {
    return this.processId;
  }

  getDevice() {
    return this.device;
  }

  getUserId() {
    return this.userId;
  }
}
