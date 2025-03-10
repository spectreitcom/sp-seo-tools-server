import { SearchResult } from '../types';

export class PositionChecker {
  static getHighestPosition(searchResults: SearchResult[], domain: string) {
    const positions: number[] = [];

    for (const searchResult of searchResults) {
      if (searchResult.url.includes(domain)) {
        positions.push(searchResult.position);
      }
    }

    return !positions.length ? -1 : Math.min(...positions);
  }
}
