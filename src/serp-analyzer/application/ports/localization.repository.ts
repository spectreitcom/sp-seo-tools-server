import { Localization } from '../../domain/localization';

export abstract class LocalizationRepository {
  abstract save(localization: Localization): Promise<void>;
  abstract findById(localizationId: string): Promise<Localization>;
  abstract findAll(): Promise<Localization[]>;
}
