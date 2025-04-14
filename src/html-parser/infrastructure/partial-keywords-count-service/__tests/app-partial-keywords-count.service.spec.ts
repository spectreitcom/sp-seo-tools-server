import { AppPartialKeywordsCountService } from '../app-partial-keywords-count.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AppPartialKeywordsCountService', () => {
  let appPartialKeywordsCountService: AppPartialKeywordsCountService;

  const phrase = 'the best of products';

  beforeEach(async () => {
    appPartialKeywordsCountService = new AppPartialKeywordsCountService();
  });

  describe('h1PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h1 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h1.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h1PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h1PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h1PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h1PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h2PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h2 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h2.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h2PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h2PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h2PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h2PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h3PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h3 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h3.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h3PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h3PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h3PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h3PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h4PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h4 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h4.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h4PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h4PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h4PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h4PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h5PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h5 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h5.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h5PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h5PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h5PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h5PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h6PartialKeywordsCount', () => {
    it('should return the count of partial keywords in h6 tags', () => {
      const buffer = readFileSync(join(__dirname, 'h6.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.h6PartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.h6PartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.h6PartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.h6PartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('pPartialKeywordsCount', () => {
    it('should return the count of partial keywords in p tags', () => {
      const buffer = readFileSync(join(__dirname, 'p.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.pPartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.pPartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.pPartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.pPartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('strongPartialKeywordsCount', () => {
    it('should return the count of partial keywords in strong/b tags', () => {
      const buffer = readFileSync(join(__dirname, 'strong.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.strongPartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.strongPartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.strongPartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.strongPartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imgAltPartialKeywordsCount', () => {
    it('should return the count of partial keywords in img alt attr', () => {
      const buffer = readFileSync(join(__dirname, 'img_alt.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.imgAltPartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(8);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.imgAltPartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.imgAltPartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.imgAltPartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('titlePartialKeywordsCount', () => {
    it('should return the count of partial keywords in title tag', () => {
      const buffer = readFileSync(join(__dirname, 'title.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.titlePartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(3);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.titlePartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.titlePartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.titlePartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('metaDescriptionPartialKeywordsCount', () => {
    it('should return the count of partial keywords in meta description', () => {
      const buffer = readFileSync(join(__dirname, 'meta_description.html'));
      const html = buffer.toString();
      const result =
        appPartialKeywordsCountService.metaDescriptionPartialKeywordsCount(
          html,
          phrase,
        );
      expect(result).toEqual(3);
    });
    it('should return 0 when there is no html', () => {
      const result1 =
        appPartialKeywordsCountService.metaDescriptionPartialKeywordsCount(
          '',
          phrase,
        );
      const result2 =
        appPartialKeywordsCountService.metaDescriptionPartialKeywordsCount(
          null,
          phrase,
        );
      const result3 =
        appPartialKeywordsCountService.metaDescriptionPartialKeywordsCount(
          undefined,
          phrase,
        );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('bodyPartialKeywordsCount', () => {
    it('should return the count of partial keywords in body', () => {
      const buffer = readFileSync(join(__dirname, 'body.html'));
      const html = buffer.toString();
      const result = appPartialKeywordsCountService.bodyPartialKeywordsCount(
        html,
        phrase,
      );
      expect(result).toEqual(24);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appPartialKeywordsCountService.bodyPartialKeywordsCount(
        '',
        phrase,
      );
      const result2 = appPartialKeywordsCountService.bodyPartialKeywordsCount(
        null,
        phrase,
      );
      const result3 = appPartialKeywordsCountService.bodyPartialKeywordsCount(
        undefined,
        phrase,
      );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });
});
