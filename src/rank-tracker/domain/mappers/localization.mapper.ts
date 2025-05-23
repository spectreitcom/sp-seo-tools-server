import { Localization } from '../localization';
import { RtLocalization } from '@prisma/client';

export class LocalizationMapper {
  static toDomain(rtLocalization: RtLocalization) {
    return new Localization(
      rtLocalization.id,
      rtLocalization.countryCode,
      rtLocalization.name,
    );
  }
}
