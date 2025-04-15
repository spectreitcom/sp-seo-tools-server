import { Analysis } from '../../domain/analysis';

export abstract class AnalysisRepository {
  abstract save(analysis: Analysis): Promise<void>;
  abstract exceededMonthlyLimit(userId: string): Promise<boolean>;
  abstract findById(analysisId: string): Promise<Analysis>;
  abstract getUsedQuotaInCurrentMonth(userId: string): Promise<number>;
}
