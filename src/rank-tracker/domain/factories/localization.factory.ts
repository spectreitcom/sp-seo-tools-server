import { Localization } from '../localization';
import { randomUUID } from 'crypto';

export class LocalizationFactory {
  static create(
    domainParam: string,
    seLocalizationId: string,
    countryCode: string,
    name: string,
  ) {
    return new Localization(
      randomUUID(),
      domainParam,
      seLocalizationId,
      countryCode,
      name,
    );
  }
}
