import { AppExactKeywordsCountService } from '../app-exact-keywords-count.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AppExactKeywordsCountService', () => {
  let appExactKeywordsCountService: AppExactKeywordsCountService;

  const buffer = readFileSync(join(__dirname, 'index.html'));
  const html = buffer.toString();

  const phrase = 'the best software house in cracow';

  beforeEach(() => {
    appExactKeywordsCountService = new AppExactKeywordsCountService();
  });

  describe('h1ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h1ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h1ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h1ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h1ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h2ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h2ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h2ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h2ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h2ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h3ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h3ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h3ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h3ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h3ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h4ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h4ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h4ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h4ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h4ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h5ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h5ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h5ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h5ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h5ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h6ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h6ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.h6ExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.h6ExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.h6ExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('pExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.pExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.pExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.pExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.pExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('strongExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.strongExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(2);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.strongExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.strongExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.strongExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imgAltExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.imgAltExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(1);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.imgAltExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.imgAltExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.imgAltExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('titleExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.titleExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(2);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.titleExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.titleExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.titleExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('metaDescriptionExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result =
        appExactKeywordsCountService.metaDescriptionExactKeywordsCount(
          html,
          phrase,
        );
      expect(result).toEqual(1);
    });
    it('should return 0 when there is no html', () => {
      const result1 =
        appExactKeywordsCountService.metaDescriptionExactKeywordsCount(
          '',
          phrase,
        );
      const result2 =
        appExactKeywordsCountService.metaDescriptionExactKeywordsCount(
          null,
          phrase,
        );
      const result3 =
        appExactKeywordsCountService.metaDescriptionExactKeywordsCount(
          undefined,
          phrase,
        );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('bodyExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.bodyExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(30);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appExactKeywordsCountService.bodyExactKeywordsCount(
        '',
        phrase,
      );
      const result2 = appExactKeywordsCountService.bodyExactKeywordsCount(
        null,
        phrase,
      );
      const result3 = appExactKeywordsCountService.bodyExactKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });
});
