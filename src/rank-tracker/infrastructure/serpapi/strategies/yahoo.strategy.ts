import { ScrapeStrategy } from './scrape-strategy';
import { SearchResult } from '../types';

export class YahooStrategy implements ScrapeStrategy {
  scrape(query: string, page: number, device: string): Promise<SearchResult[]> {
    return Promise.resolve([]);
  }
}
