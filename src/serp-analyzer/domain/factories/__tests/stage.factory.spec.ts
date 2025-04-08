import { StageFactory } from '../stage.factory';
import { randomUUID } from 'crypto';
import { Stage } from '../../stage';

describe('StageFactory', () => {
  describe('crate', () => {
    it('should return instance of Stage', () => {
      const stage = StageFactory.create('html_structure', randomUUID());
      expect(stage).toBeInstanceOf(Stage);
    });
  });
});
