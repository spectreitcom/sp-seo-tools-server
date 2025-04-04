import { Localization } from '../localization';
import { randomUUID } from 'crypto';

export class LocalizationFactory {
  static create(countryCode: string, name: string) {
    return new Localization(randomUUID(), countryCode, name);
  }
}
