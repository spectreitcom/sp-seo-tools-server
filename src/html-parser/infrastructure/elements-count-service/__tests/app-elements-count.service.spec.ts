import { AppElementsCountService } from '../app-elements-count.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AppElementsCountService', () => {
  let appElementsCountService: AppElementsCountService;
  const buffer = readFileSync(join(__dirname, 'index.html'));
  const html = buffer.toString();

  beforeEach(() => {
    appElementsCountService = new AppElementsCountService();
  });

  describe('h1ElementsCount', () => {
    it('should count h1 elements', () => {
      const result = appElementsCountService.h1ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h1ElementsCount('');
      const result2 = appElementsCountService.h1ElementsCount(null);
      const result3 = appElementsCountService.h1ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h2ElementsCount', () => {
    it('should count h2 elements', () => {
      const result = appElementsCountService.h2ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h2ElementsCount('');
      const result2 = appElementsCountService.h2ElementsCount(null);
      const result3 = appElementsCountService.h2ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h3ElementsCount', () => {
    it('should count h3 elements', () => {
      const result = appElementsCountService.h3ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h3ElementsCount('');
      const result2 = appElementsCountService.h3ElementsCount(null);
      const result3 = appElementsCountService.h3ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h4ElementsCount', () => {
    it('should count h4 elements', () => {
      const result = appElementsCountService.h4ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h4ElementsCount('');
      const result2 = appElementsCountService.h4ElementsCount(null);
      const result3 = appElementsCountService.h4ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h5ElementsCount', () => {
    it('should count h5 elements', () => {
      const result = appElementsCountService.h5ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h5ElementsCount('');
      const result2 = appElementsCountService.h5ElementsCount(null);
      const result3 = appElementsCountService.h5ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h6ElementsCount', () => {
    it('should count h6 elements', () => {
      const result = appElementsCountService.h6ElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.h6ElementsCount('');
      const result2 = appElementsCountService.h6ElementsCount(null);
      const result3 = appElementsCountService.h6ElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('pElementsCount', () => {
    it('should count p elements', () => {
      const result = appElementsCountService.pElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.pElementsCount('');
      const result2 = appElementsCountService.pElementsCount(null);
      const result3 = appElementsCountService.pElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('strongElementsCount', () => {
    it('should count strong/b elements', () => {
      const result = appElementsCountService.strongElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.strongElementsCount('');
      const result2 = appElementsCountService.strongElementsCount(null);
      const result3 = appElementsCountService.strongElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('linkElementsCount', () => {
    it('should count link elements', () => {
      const result = appElementsCountService.linkElementsCount(html);
      expect(result).toEqual(4);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.linkElementsCount('');
      const result2 = appElementsCountService.linkElementsCount(null);
      const result3 = appElementsCountService.linkElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('linkNofollowElementsCount', () => {
    it('should count link nofollow elements', () => {
      const result = appElementsCountService.linkNofollowElementsCount(html);
      expect(result).toEqual(1);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.linkNofollowElementsCount('');
      const result2 = appElementsCountService.linkNofollowElementsCount(null);
      const result3 =
        appElementsCountService.linkNofollowElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('linkDofollowElementsCount', () => {
    it('should count link dofollow elements', () => {
      const result = appElementsCountService.linkDofollowElementsCount(html);
      expect(result).toEqual(3);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.linkDofollowElementsCount('');
      const result2 = appElementsCountService.linkDofollowElementsCount(null);
      const result3 =
        appElementsCountService.linkDofollowElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imageElementsCount', () => {
    it('should count image elements', () => {
      const result = appElementsCountService.imageElementsCount(html);
      expect(result).toEqual(3);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.imageElementsCount('');
      const result2 = appElementsCountService.imageElementsCount(null);
      const result3 = appElementsCountService.imageElementsCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imageElementsWithAltCount', () => {
    it('should count image with alt elements', () => {
      const result = appElementsCountService.imageElementsWithAltCount(html);
      expect(result).toEqual(1);
    });
    it('should return 0 when there is no html', () => {
      const result1 = appElementsCountService.imageElementsWithAltCount('');
      const result2 = appElementsCountService.imageElementsWithAltCount(null);
      const result3 =
        appElementsCountService.imageElementsWithAltCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imageElementsWithoutOrWithEmptyAltCount', () => {
    it('should count image without or empty alt elements', () => {
      const result =
        appElementsCountService.imageElementsWithoutOrWithEmptyAltCount(html);
      expect(result).toEqual(2);
    });
    it('should return 0 when there is no html', () => {
      const result1 =
        appElementsCountService.imageElementsWithoutOrWithEmptyAltCount('');
      const result2 =
        appElementsCountService.imageElementsWithoutOrWithEmptyAltCount(null);
      const result3 =
        appElementsCountService.imageElementsWithoutOrWithEmptyAltCount(
          undefined,
        );
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });
});
