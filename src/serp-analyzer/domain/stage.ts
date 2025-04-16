import { SaStageStatus } from '@prisma/client';

export class Stage {
  constructor(
    private readonly stageId: string,
    private readonly stage: string,
    private readonly pageId: string,
    private status: SaStageStatus,
  ) {}

  complete() {
    this.status = SaStageStatus.COMPLETED;
  }

  makeInProgress() {
    this.status = SaStageStatus.PENDING;
  }

  getStageId() {
    return this.stageId;
  }

  getStage() {
    return this.stage;
  }

  getPageId() {
    return this.pageId;
  }

  getStatus() {
    return this.status;
  }
}
