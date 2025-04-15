import { AnalysisProgress } from '../analysis-progress';
import { SaAnalysisProgress } from '@prisma/client';

export class AnalysisProgressMapper {
  static toDomain(model: SaAnalysisProgress) {
    return new AnalysisProgress(
      model.id,
      model.analysisId,
      model.current,
      model.total,
    );
  }
}
