import { AnalysisFactory } from '../factories/analysis.factory';
import { randomUUID } from 'crypto';
import { DESKTOP_DEVICE } from '../constants';
import { CreateAnalysisError } from '../exceptions';

describe('Analysis', () => {
  describe('create', () => {
    it('should create an analysis when user has active testing mode and not exceeded monthly limit', () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        true,
        false,
        false,
      );
      expect(() => analysis.create()).not.toThrow(CreateAnalysisError);
    });
    it('should create an analysis when user has active subscription and not exceeded monthly limit', () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        false,
        true,
        false,
      );
      expect(() => analysis.create()).not.toThrow(CreateAnalysisError);
    });
    it("should not create an analysis when user doesn't have neither active subscription nor active testing mode", () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        false,
        false,
        false,
      );
      expect(() => analysis.create()).toThrow(CreateAnalysisError);
    });
    it('should not create an analysis when user has active testing mode but exceeded monthly limit', () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        true,
        false,
        true,
      );
      expect(() => analysis.create()).toThrow(CreateAnalysisError);
    });
    it('should not create an analysis when user has active subscription but exceeded monthly limit', () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        false,
        true,
        true,
      );
      expect(() => analysis.create()).toThrow(CreateAnalysisError);
    });
  });
  describe('updateProcessId', () => {
    it('should update processId', () => {
      const analysis = AnalysisFactory.create(
        'test',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        false,
        true,
        true,
      );
      analysis.updateProcessId('test');
      expect(analysis.getProcessId()).toEqual('test');
    });
  });
});
