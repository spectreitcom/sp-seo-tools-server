import { SaAnalysis } from '@prisma/client';
import { Analysis } from '../analysis';

export class AnalysisMapper {
  static toDomain(
    model: SaAnalysis,
    hasActiveTestingMode: boolean,
    hasActiveSubscription: boolean,
    exceededMonthlyLimit: boolean,
  ) {
    return new Analysis(
      model.id,
      model.keyword,
      model.localizationId,
      model.processId,
      model.device,
      model.userId,
      hasActiveTestingMode,
      hasActiveSubscription,
      exceededMonthlyLimit,
      model.error,
    );
  }
}
