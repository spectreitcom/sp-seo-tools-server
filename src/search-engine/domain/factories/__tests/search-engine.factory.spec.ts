import { SearchEngineFactory } from '../search-engine.factory';
import { SearchEngine } from '../../search-engine';

describe('SearchEngineFactory', () => {
  describe('create', () => {
    it('should create SearchEngine instance', () => {
      const searchEngine = SearchEngineFactory.create('Google', 'GOOGLE');
      expect(searchEngine).toBeInstanceOf(SearchEngine);
    });
  });
});
