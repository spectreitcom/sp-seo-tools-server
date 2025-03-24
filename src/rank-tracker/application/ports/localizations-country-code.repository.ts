import { LocalizationsCountryCodeDto } from '../dto/localizations-country-code.dto';

export abstract class LocalizationsCountryCodeRepository {
  abstract findAll(): Promise<LocalizationsCountryCodeDto[]>;
}
