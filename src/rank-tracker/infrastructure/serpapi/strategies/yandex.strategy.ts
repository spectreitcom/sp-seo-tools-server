import { ScrapeStrategy } from './scrape-strategy';
import { SearchResult } from '../types';

export class YandexStrategy implements ScrapeStrategy {
  scrape(query: string, page: number, _: string): Promise<SearchResult[]> {
    return Promise.resolve([]);
  }
}
