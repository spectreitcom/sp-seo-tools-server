import { KeywordFactory } from '../keyword.factory';
import { randomUUID } from 'crypto';
import { Keyword } from '../../keyword';
import { DESKTOP_DEVICE } from '../../../application/constants';

describe('KeywordFactory', () => {
  describe('create', () => {
    it('should create Keyword instance', () => {
      const keyword = KeywordFactory.create(
        true,
        10,
        100,
        randomUUID(),
        'some keyword',
        randomUUID(),
        DESKTOP_DEVICE,
        randomUUID(),
        false,
      );

      expect(keyword).toBeInstanceOf(Keyword);
    });
  });
});
