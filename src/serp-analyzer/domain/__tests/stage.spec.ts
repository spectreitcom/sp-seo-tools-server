import { StageFactory } from '../factories/stage.factory';
import { randomUUID } from 'crypto';
import { SaStageStatus } from '@prisma/client';

describe('Stage', () => {
  describe('complete', () => {
    it('should complete stage', () => {
      const stage = StageFactory.create('html_structure', randomUUID());
      stage.complete();
      expect(stage.getStatus()).toEqual(SaStageStatus.COMPLETED);
    });
  });
});
