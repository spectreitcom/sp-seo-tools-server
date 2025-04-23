import { IQuery } from '@nestjs/cqrs';

export class GetAnalysisDetailsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly analysisId: string,
  ) {}
}
