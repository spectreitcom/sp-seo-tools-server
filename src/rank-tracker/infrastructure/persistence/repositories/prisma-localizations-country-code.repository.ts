import { Injectable } from '@nestjs/common';
import { LocalizationsCountryCodeRepository } from '../../../application/ports/localizations-country-code.repository';
import { DatabaseService } from '../../../../database/database.service';
import { LocalizationsCountryCodeDto } from '../../../application/dto/localizations-country-code.dto';

@Injectable()
export class PrismaLocalizationsCountryCodeRepository
  implements LocalizationsCountryCodeRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<LocalizationsCountryCodeDto[]> {
    const models = await this.databaseService.rtLocalization.findMany({
      distinct: ['countryCode'],
    });

    return models.map(
      (model) => new LocalizationsCountryCodeDto(model.countryCode, model.name),
    );
  }
}
