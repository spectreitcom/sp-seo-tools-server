import { AppCharactersCountService } from '../app-characters-count.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AppCharactersCountService', () => {
  let appCharactersCountService: AppCharactersCountService;
  const buffer = readFileSync(join(__dirname, 'index.html'));
  const html = buffer.toString();

  beforeEach(() => {
    appCharactersCountService = new AppCharactersCountService();
  });

  describe('h1CharactersCount', () => {
    it('should count characters within h1 elements', () => {
      const result = appCharactersCountService.h1CharactersCount(html);
      expect(result).toEqual(232);
    });
  });

  describe('h2CharactersCount', () => {
    it('should count characters within h2 elements', () => {
      const result = appCharactersCountService.h2CharactersCount(html);
      expect(result).toEqual(116);
    });
  });

  describe('h3CharactersCount', () => {
    it('should count characters within h3 elements', () => {
      const result = appCharactersCountService.h3CharactersCount(html);
      expect(result).toEqual(58);
    });
  });

  describe('h4CharactersCount', () => {
    it('should count characters within h4 elements', () => {
      const result = appCharactersCountService.h4CharactersCount(html);
      expect(result).toEqual(174);
    });
  });

  describe('h5CharactersCount', () => {
    it('should count characters within h5 elements', () => {
      const result = appCharactersCountService.h5CharactersCount(html);
      expect(result).toEqual(174);
    });
  });

  describe('h6CharactersCount', () => {
    it('should count characters within h6 elements', () => {
      const result = appCharactersCountService.h6CharactersCount(html);
      expect(result).toEqual(58);
    });
  });

  describe('pCharactersCount', () => {
    it('should count characters within p elements', () => {
      const result = appCharactersCountService.pCharactersCount(html);
      expect(result).toEqual(58 * 2);
    });
  });

  describe('strongCharactersCount', () => {
    it('should count characters within strong/b elements', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appCharactersCountService.strongCharactersCount(html);
      expect(result).toEqual(2 * 58);
    });
  });

  describe('imgAltCharactersCount', () => {
    it('should count characters within img alt elements', () => {
      const result = appCharactersCountService.imgAltCharactersCount(html);
      expect(result).toEqual(2 * 58);
    });
  });

  describe('titleCharactersCount', () => {
    it('should count characters within title element', () => {
      const result = appCharactersCountService.titleCharactersCount(html);
      expect(result).toEqual(19);
    });
  });

  describe('metaDescriptionCharactersCount', () => {
    it('should count characters within meta description element', () => {
      const result =
        appCharactersCountService.metaDescriptionCharactersCount(html);
      expect(result).toEqual(57);
    });
  });

  describe('bodyCharactersCount', () => {
    it('should count characters within body element', () => {
      const buffer = readFileSync(join(__dirname, 'index3.html'));
      const html = buffer.toString();
      const result = appCharactersCountService.bodyCharactersCount(html);
      expect(result).toEqual(348);
    });
  });
});
