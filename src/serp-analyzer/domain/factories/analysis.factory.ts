import { Analysis } from '../analysis';
import { randomUUID } from 'crypto';

export class AnalysisFactory {
  static create(
    keyword: string,
    localizationId: string,
    device: string,
    userId: string,
    hasActiveTestingMode: boolean,
    hasActiveSubscription: boolean,
    exceededMonthlyLimit: boolean,
  ) {
    return new Analysis(
      randomUUID(),
      keyword,
      localizationId,
      null,
      device,
      userId,
      hasActiveTestingMode,
      hasActiveSubscription,
      exceededMonthlyLimit,
    );
  }
}
