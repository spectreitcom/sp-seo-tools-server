import { Injectable } from '@nestjs/common';
import { LocalizationRepository } from '../../application/ports/localization.repository';
import { Localization } from '../../domain/localization';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class PrismaLocalizationRepository implements LocalizationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(localization: Localization): Promise<void> {
    const localizationModel =
      await this.databaseService.saLocalization.findUnique({
        where: {
          id: localization.getLocalizationId(),
        },
      });

    if (localizationModel) {
      await this.databaseService.saLocalization.update({
        where: {
          id: localization.getLocalizationId(),
        },
        data: {
          name: localization.getName(),
          countryCode: localization.getCountryCode(),
        },
      });
      return;
    }

    await this.databaseService.saLocalization.create({
      data: {
        id: localization.getLocalizationId(),
        name: localization.getName(),
        countryCode: localization.getCountryCode(),
      },
    });
  }
}
