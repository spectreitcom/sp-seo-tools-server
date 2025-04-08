import { IEvent } from '@nestjs/cqrs';

export class StageProcessingFinishedEvent implements IEvent {
  constructor(public readonly stageId: string) {}
}
