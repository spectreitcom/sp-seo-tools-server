import { SearchResult } from '../../serpapi/types';
import { PositionChecker } from '../position-checker';

const SEARCH_RESULTS: SearchResult[] = [
  {
    url: 'https://en.wikipedia.org/wiki/Coffee',
    position: 1,
  },
  {
    url: 'https://austin.eater.com/maps/best-coffee-austin-cafes-patio-latte-pour-over',
    position: 2,
  },
  {
    url: 'https://www.coffeebean.com/',
    position: 3,
  },
  {
    url: 'https://www.amazon.com/coffee/s?k=coffee',
    position: 4,
  },
  {
    url: 'https://www.peets.com/',
    position: 5,
  },
  {
    url: 'https://www.peets.com/about-as',
    position: 6,
  },
];

describe('PositionChecker', () => {
  describe('getHighestPosition', () => {
    it('should return position as a positive integer', () => {
      expect(
        PositionChecker.getHighestPosition(SEARCH_RESULTS, 'amazon.com'),
      ).toEqual(4);
      expect(
        PositionChecker.getHighestPosition(SEARCH_RESULTS, 'peets.com'),
      ).toEqual(5);
    });
    it('should return -1 when domain was not found', () => {
      expect(
        PositionChecker.getHighestPosition(SEARCH_RESULTS, 'google.com'),
      ).toEqual(-1);
    });
  });
});
