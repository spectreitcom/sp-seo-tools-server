import { LocalizationFactory } from '../localization.factory';
import { Localization } from '../../localization';

describe('LocalizationFactory', () => {
  describe('create', () => {
    it('should create Localization instance', () => {
      const localization = LocalizationFactory.create('pl', 'Poland');
      expect(localization).toBeInstanceOf(Localization);
    });
  });
});
