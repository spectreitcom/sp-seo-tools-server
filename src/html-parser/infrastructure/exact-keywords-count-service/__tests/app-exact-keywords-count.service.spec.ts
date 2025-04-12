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
  });

  describe('h2ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h2ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
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
  });

  describe('h4ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h4ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
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
  });

  describe('h6ExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.h6ExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(4);
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
  });

  describe('strongExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.strongExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(2);
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
  });

  describe('titleExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.titleExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(2);
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
  });

  describe('bodyExactKeywordsCount', () => {
    it('should count exact keyword', () => {
      const result = appExactKeywordsCountService.bodyExactKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(30);
    });
  });
});
