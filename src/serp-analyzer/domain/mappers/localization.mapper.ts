import { SaLocalization } from '@prisma/client';
import { Localization } from '../localization';

export class LocalizationMapper {
  static toDomain(model: SaLocalization) {
    return new Localization(model.id, model.countryCode, model.name);
  }
}
