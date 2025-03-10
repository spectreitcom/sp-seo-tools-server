import { SearchResult } from '../types';

export abstract class GoogleScraperService {
  abstract getResults(
    localizationCode: string,
    resultsNumber: number,
    query: string,
  ): Promise<SearchResult[]>;
}
