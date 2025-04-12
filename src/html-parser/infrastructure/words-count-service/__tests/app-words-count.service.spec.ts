import { AppWordsCountService } from '../app-words-count.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AppWordsCountService', () => {
  let appWordsCountService: AppWordsCountService;

  const buffer = readFileSync(join(__dirname, 'index.html'));
  const html = buffer.toString();

  beforeEach(() => {
    appWordsCountService = new AppWordsCountService();
  });

  describe('h1WordsCount', () => {
    it('should count words in h1 tags', () => {
      const result = appWordsCountService.h1WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h1 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h1WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('h2WordsCount', () => {
    it('should count words in h2 tags', () => {
      const result = appWordsCountService.h2WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h2 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h2WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('h3WordsCount', () => {
    it('should count words in h3 tags', () => {
      const result = appWordsCountService.h3WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h3 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h3WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('h4WordsCount', () => {
    it('should count words in h4 tags', () => {
      const result = appWordsCountService.h4WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h4 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h4WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('h5WordsCount', () => {
    it('should count words in h5 tags', () => {
      const result = appWordsCountService.h5WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h5 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h5WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('h6WordsCount', () => {
    it('should count words in h6 tags', () => {
      const result = appWordsCountService.h6WordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a h6 does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.h6WordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('pWordsCount', () => {
    it('should count words in p tags', () => {
      const result = appWordsCountService.pWordsCount(html);
      expect(result).toEqual(30);
    });

    it('should return 0 when a title does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.pWordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('strongWordsCount', () => {
    it('should count words in strong/b tags', () => {
      const result = appWordsCountService.strongWordsCount(html);
      expect(result).toEqual(20);
    });

    it('should return 0 when a strong/b does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.strongWordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('imgAltWordsCount', () => {
    it('should count words in alt attrs', () => {
      const result = appWordsCountService.imgAltWordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a alt attrs does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.imgAltWordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('titleWordsCount', () => {
    it('should count words in title', () => {
      const result = appWordsCountService.titleWordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a title does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.titleWordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('metaDescriptionWordsCount', () => {
    it('should count meta description words', () => {
      const result = appWordsCountService.metaDescriptionWordsCount(html);
      expect(result).toEqual(10);
    });

    it('should return 0 when a meta description does not exist', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appWordsCountService.metaDescriptionWordsCount(html);
      expect(result).toEqual(0);
    });
  });

  describe('bodyWordsCount', () => {
    it('should count words in the body', () => {
      const result = appWordsCountService.bodyWordsCount(html);
      expect(result).toEqual(90);
    });
  });
});
