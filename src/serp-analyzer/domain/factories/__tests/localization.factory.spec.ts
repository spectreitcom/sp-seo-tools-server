import { LocalizationFactory } from '../localization.factory';
import { Localization } from '../../localization';

describe('LocalizationFactory', () => {
  describe('create', () => {
    it('should create a Localization instance with the given countryCode and name', () => {
      const localization = LocalizationFactory.create('pl', 'Poland');
      expect(localization).toBeInstanceOf(Localization);
      expect(localization.getCountryCode()).toBe('pl');
      expect(localization.getName()).toBe('Poland');
    });
  });
});
