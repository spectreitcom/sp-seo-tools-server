import { QueryFactory } from '../query.factory';
import { randomUUID } from 'crypto';
import { Query } from '../../query';

describe('QueryFactory', () => {
  describe('create', () => {
    it('should create an instance of Query', () => {
      const query = QueryFactory.create(
        randomUUID(),
        null,
        'pl',
        50,
        'test',
        'desktop',
        randomUUID(),
      );
      expect(query).toBeInstanceOf(Query);
      expect(query.getMetadata()).toBeNull();
    });
  });
});
