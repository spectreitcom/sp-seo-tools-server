import { IEvent } from '@nestjs/cqrs';
import { Metadata } from '../../application/types';

export class ExceededTimeLimitEvent implements IEvent {
  constructor(
    public readonly queryId: string,
    public readonly metadata: Metadata,
    public readonly processId: string,
  ) {}
}
