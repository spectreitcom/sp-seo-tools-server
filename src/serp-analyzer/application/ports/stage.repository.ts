import { Stage } from '../../domain/stage';

export abstract class StageRepository {
  abstract save(stage: Stage): Promise<void>;
  abstract findById(stageId: string): Promise<Stage>;
}
