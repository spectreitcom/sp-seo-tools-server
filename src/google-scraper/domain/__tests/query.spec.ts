import { QueryFactory } from '../factories/query.factory';
import { randomUUID } from 'crypto';
import { GsQueryStatus } from '@prisma/client';

describe('Query', () => {
  describe('finish', () => {
    it('should finish the query', () => {
      const query = QueryFactory.create(
        randomUUID(),
        { foo: 'bar' },
        'pl',
        50,
        'test',
        'desktop',
        randomUUID(),
      );
      query.finish({ organic: undefined });
      expect(query.getStatus()).toBe(GsQueryStatus.DONE);
      expect(query.getResults()).toEqual({ organic: undefined });
    });
  });
});
