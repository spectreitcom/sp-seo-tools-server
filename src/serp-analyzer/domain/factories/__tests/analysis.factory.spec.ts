import { AnalysisFactory } from '../analysis.factory';
import { randomUUID } from 'crypto';
import { MOBILE_DEVICE } from '../../constants';
import { Analysis } from '../../analysis';

describe('AnalysisFactory', () => {
  describe('create', () => {
    it('should create an instance of Analysis', () => {
      const analysis = AnalysisFactory.create(
        'the best software house in the world',
        randomUUID(),
        MOBILE_DEVICE,
        randomUUID(),
        false,
        true,
        false,
      );
      expect(analysis).toBeInstanceOf(Analysis);
    });
  });
});
