import { IEvent } from '@nestjs/cqrs';

export class AnalysisFinishedEvent implements IEvent {
  constructor(public readonly analysisId: string) {}
}
