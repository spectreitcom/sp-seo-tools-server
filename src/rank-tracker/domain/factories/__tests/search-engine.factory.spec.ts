import { SearchEngineFactory } from '../search-engine.factory';
import { randomUUID } from 'crypto';
import { SearchEngine } from '../../search-engine';

describe('SearchEngineFactory', () => {
  describe('create', () => {
    it('should create SearchEngine instance', () => {
      const searchEngine = SearchEngineFactory.create(
        'Google',
        randomUUID(),
        'GOOGLE',
      );
      expect(searchEngine).toBeInstanceOf(SearchEngine);
    });
  });
});
