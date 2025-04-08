import { IEvent } from '@nestjs/cqrs';

export class AnalysisCreatedEvent implements IEvent {
  constructor(public readonly analysisId: string) {}
}
