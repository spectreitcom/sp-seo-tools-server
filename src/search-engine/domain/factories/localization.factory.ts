import { Localization } from '../localization';
import { randomUUID } from 'crypto';

export class LocalizationFactory {
  static create(
    domainParam: string,
    searchEngineId: string,
    countryCode: string,
    name: string,
  ) {
    const localizationId = randomUUID();
    return new Localization(
      localizationId,
      domainParam,
      searchEngineId,
      countryCode,
      name,
    );
  }
}
