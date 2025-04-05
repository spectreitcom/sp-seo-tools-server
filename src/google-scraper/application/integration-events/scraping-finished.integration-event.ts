import { IEvent } from '@nestjs/cqrs';
import { Device, Metadata, SearchResult } from '../types';

export class ScrapingFinishedIntegrationEvent implements IEvent {
  constructor(
    public readonly processId: string,
    public readonly metadata: Metadata,
    public readonly results: SearchResult[],
    public readonly localizationCode: string,
    public readonly resultsNumber: number,
    public readonly query: string,
    public readonly device: Device,
  ) {}
}
