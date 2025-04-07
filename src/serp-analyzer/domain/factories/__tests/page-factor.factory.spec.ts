import { PageFactorFactory } from '../page-factor.factory';
import { randomUUID } from 'crypto';
import { PageFactor } from '../../page-factor';

describe('PageFactorFactory', () => {
  describe('create', () => {
    it('should create an instance of PageFactor', () => {
      const pageFactor = PageFactorFactory.create(
        randomUUID(),
        'h1_keywords_count',
        1000,
      );
      expect(pageFactor).toBeInstanceOf(PageFactor);
    });
  });
});
