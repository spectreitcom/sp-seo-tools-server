import { Localization } from '../localization';
import { randomUUID } from 'crypto';

export class LocalizationFactory {
  static create(countryCode: string, name: string) {
    const localizationId = randomUUID();
    return new Localization(localizationId, countryCode, name);
  }
}
