import { Localization } from '../../domain/localization';

export abstract class LocalizationRepository {
  abstract save(localization: Localization): Promise<void>;
}
