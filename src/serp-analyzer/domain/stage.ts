import { SaStageStatus } from '@prisma/client';

export class Stage {
  constructor(
    private readonly stageId: string,
    private stage: string,
    private pageId: string,
    private status: SaStageStatus,
  ) {}

  complete() {
    this.status = SaStageStatus.COMPLETED;
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
