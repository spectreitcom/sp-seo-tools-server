import { AnalysisProgressFactory } from '../analysis-progress.factory';
import { randomUUID } from 'crypto';
import { AnalysisProgress } from '../../analysis-progress';

describe('AnalysisProgressFactory', () => {
  describe('create', () => {
    it('should create an instance of AnalysisProgress', () => {
      const analysisProgress = AnalysisProgressFactory.create(
        randomUUID(),
        1000,
      );
      expect(analysisProgress).toBeInstanceOf(AnalysisProgress);
    });
  });
});
