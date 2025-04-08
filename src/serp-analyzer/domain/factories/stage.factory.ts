import { Stage } from '../stage';
import { randomUUID } from 'crypto';
import { SaStageStatus } from '@prisma/client';

export class StageFactory {
  static create(
    stage: string,
    pageId: string,
    status: SaStageStatus = SaStageStatus.CREATED,
  ) {
    return new Stage(randomUUID(), stage, pageId, status);
  }
}
