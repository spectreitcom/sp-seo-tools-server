import { SearchResult } from '../types';

export abstract class ScrapeStrategy {
  abstract scrape(
    query: string,
    page: number,
    device: string,
    domainParam: string,
  ): Promise<SearchResult[]>;
}
