import { Device, SearchResult, SendQueryResponse } from '../types';

export abstract class GoogleScraperService {
  abstract getResults(
    responseId: string,
    resultsNumber: number,
  ): Promise<SearchResult[] | null>;

  abstract sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
  ): Promise<SendQueryResponse>;
}
