import { IEvent } from '@nestjs/cqrs';
import { Metadata } from '../types';

export class ScrapingErrorIntegrationEvent implements IEvent {
  constructor(
    public readonly processId: string,
    public readonly metadata: Metadata,
  ) {}
}
