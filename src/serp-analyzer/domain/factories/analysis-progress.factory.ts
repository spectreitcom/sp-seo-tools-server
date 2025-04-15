import { AnalysisProgress } from '../analysis-progress';
import { randomUUID } from 'crypto';

export class AnalysisProgressFactory {
  static create(analysisId: string, total: number) {
    return new AnalysisProgress(randomUUID(), analysisId, 0, total);
  }
}
