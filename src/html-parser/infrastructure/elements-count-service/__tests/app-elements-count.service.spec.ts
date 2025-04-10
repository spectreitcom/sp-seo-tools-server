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
  });

  describe('h2ElementsCount', () => {
    it('should count h2 elements', () => {
      const result = appElementsCountService.h2ElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('h3ElementsCount', () => {
    it('should count h3 elements', () => {
      const result = appElementsCountService.h3ElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('h4ElementsCount', () => {
    it('should count h4 elements', () => {
      const result = appElementsCountService.h4ElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('h5ElementsCount', () => {
    it('should count h5 elements', () => {
      const result = appElementsCountService.h5ElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('h6ElementsCount', () => {
    it('should count h6 elements', () => {
      const result = appElementsCountService.h6ElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('pElementsCount', () => {
    it('should count p elements', () => {
      const result = appElementsCountService.pElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('strongElementsCount', () => {
    it('should count strong/b elements', () => {
      const result = appElementsCountService.strongElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('linkElementsCount', () => {
    it('should count link elements', () => {
      const result = appElementsCountService.linkElementsCount(html);
      expect(result).toEqual(4);
    });
  });

  describe('linkNofollowElementsCount', () => {
    it('should count link nofollow elements', () => {
      const result = appElementsCountService.linkNofollowElementsCount(html);
      expect(result).toEqual(1);
    });
  });

  describe('linkDofollowElementsCount', () => {
    it('should count link dofollow elements', () => {
      const result = appElementsCountService.linkDofollowElementsCount(html);
      expect(result).toEqual(3);
    });
  });

  describe('imageElementsCount', () => {
    it('should count image elements', () => {
      const result = appElementsCountService.imageElementsCount(html);
      expect(result).toEqual(3);
    });
  });

  describe('imageElementsWithAltCount', () => {
    it('should count image with alt elements', () => {
      const result = appElementsCountService.imageElementsWithAltCount(html);
      expect(result).toEqual(1);
    });
  });

  describe('imageElementsWithoutOrWithEmptyAltCount', () => {
    it('should count image without or empty alt elements', () => {
      const result =
        appElementsCountService.imageElementsWithoutOrWithEmptyAltCount(html);
      expect(result).toEqual(2);
    });
  });
});
