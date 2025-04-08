import { IEvent } from '@nestjs/cqrs';
import { GetDataResponse, Metadata } from '../../application/types';

export class ScrapingFinishedEvent implements IEvent {
  constructor(
    public readonly queryId: string,
    public readonly processId: string,
    public readonly metadata: Metadata,
    public readonly results: GetDataResponse | null,
    public readonly localizationCode: string,
    public readonly resultsNumber: number,
    public readonly query: string,
    public readonly device: string,
  ) {}
}
