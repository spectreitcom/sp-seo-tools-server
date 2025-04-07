import { Stage } from '../stage';
import { SaStage } from '@prisma/client';

export class StageMapper {
  static toDomain(model: SaStage) {
    return new Stage(model.id, model.stage, model.pageId, model.status);
  }
}
