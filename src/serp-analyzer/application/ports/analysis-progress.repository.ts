import { AnalysisProgress } from '../../domain/analysis-progress';

export abstract class AnalysisProgressRepository {
  abstract save(analysisProgress: AnalysisProgress): Promise<void>;
  abstract findByAnalysis(analysisId: string): Promise<AnalysisProgress>;
  abstract findByAnalysisAndUser(
    analysisId: string,
    userId: string,
  ): Promise<AnalysisProgress>;
}
