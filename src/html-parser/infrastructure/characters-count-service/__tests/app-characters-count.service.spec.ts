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
    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h1CharactersCount('');
      const result2 = appCharactersCountService.h1CharactersCount(null);
      const result3 = appCharactersCountService.h1CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h2CharactersCount', () => {
    it('should count characters within h2 elements', () => {
      const result = appCharactersCountService.h2CharactersCount(html);
      expect(result).toEqual(116);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h2CharactersCount('');
      const result2 = appCharactersCountService.h2CharactersCount(null);
      const result3 = appCharactersCountService.h2CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h3CharactersCount', () => {
    it('should count characters within h3 elements', () => {
      const result = appCharactersCountService.h3CharactersCount(html);
      expect(result).toEqual(58);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h3CharactersCount('');
      const result2 = appCharactersCountService.h3CharactersCount(null);
      const result3 = appCharactersCountService.h3CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h4CharactersCount', () => {
    it('should count characters within h4 elements', () => {
      const result = appCharactersCountService.h4CharactersCount(html);
      expect(result).toEqual(174);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h4CharactersCount('');
      const result2 = appCharactersCountService.h4CharactersCount(null);
      const result3 = appCharactersCountService.h4CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h5CharactersCount', () => {
    it('should count characters within h5 elements', () => {
      const result = appCharactersCountService.h5CharactersCount(html);
      expect(result).toEqual(174);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h5CharactersCount('');
      const result2 = appCharactersCountService.h5CharactersCount(null);
      const result3 = appCharactersCountService.h5CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('h6CharactersCount', () => {
    it('should count characters within h6 elements', () => {
      const result = appCharactersCountService.h6CharactersCount(html);
      expect(result).toEqual(58);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.h6CharactersCount('');
      const result2 = appCharactersCountService.h6CharactersCount(null);
      const result3 = appCharactersCountService.h6CharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('pCharactersCount', () => {
    it('should count characters within p elements', () => {
      const result = appCharactersCountService.pCharactersCount(html);
      expect(result).toEqual(58 * 2);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.pCharactersCount('');
      const result2 = appCharactersCountService.pCharactersCount(null);
      const result3 = appCharactersCountService.pCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('strongCharactersCount', () => {
    it('should count characters within strong/b elements', () => {
      const buffer = readFileSync(join(__dirname, 'index2.html'));
      const html = buffer.toString();
      const result = appCharactersCountService.strongCharactersCount(html);
      expect(result).toEqual(2 * 58);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.strongCharactersCount('');
      const result2 = appCharactersCountService.strongCharactersCount(null);
      const result3 =
        appCharactersCountService.strongCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('imgAltCharactersCount', () => {
    it('should count characters within img alt elements', () => {
      const result = appCharactersCountService.imgAltCharactersCount(html);
      expect(result).toEqual(2 * 58);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.imgAltCharactersCount('');
      const result2 = appCharactersCountService.imgAltCharactersCount(null);
      const result3 =
        appCharactersCountService.imgAltCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('titleCharactersCount', () => {
    it('should count characters within title element', () => {
      const result = appCharactersCountService.titleCharactersCount(html);
      expect(result).toEqual(19);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.titleCharactersCount('');
      const result2 = appCharactersCountService.titleCharactersCount(null);
      const result3 = appCharactersCountService.titleCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('metaDescriptionCharactersCount', () => {
    it('should count characters within meta description element', () => {
      const result =
        appCharactersCountService.metaDescriptionCharactersCount(html);
      expect(result).toEqual(57);
    });

    it('should return 0 when there is no html', () => {
      const result1 =
        appCharactersCountService.metaDescriptionCharactersCount('');
      const result2 =
        appCharactersCountService.metaDescriptionCharactersCount(null);
      const result3 =
        appCharactersCountService.metaDescriptionCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });

  describe('bodyCharactersCount', () => {
    it('should count characters within body element', () => {
      const buffer = readFileSync(join(__dirname, 'index3.html'));
      const html = buffer.toString();
      const result = appCharactersCountService.bodyCharactersCount(html);
      expect(result).toEqual(348);
    });

    it('should return 0 when there is no html', () => {
      const result1 = appCharactersCountService.bodyCharactersCount('');
      const result2 = appCharactersCountService.bodyCharactersCount(null);
      const result3 = appCharactersCountService.bodyCharactersCount(undefined);
      expect(result1).toEqual(0);
      expect(result2).toEqual(0);
      expect(result3).toEqual(0);
    });
  });
});
