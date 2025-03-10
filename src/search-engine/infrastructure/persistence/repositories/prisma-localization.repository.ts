import { Injectable } from '@nestjs/common';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { Localization } from 'src/search-engine/domain/localization';
import { DatabaseService } from '../../../../database/database.service';

@Injectable()
export class PrismaLocalizationRepository implements LocalizationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(localization: Localization): Promise<void> {
    const localizationModel =
      await this.databaseService.seLocalization.findFirst({
        where: {
          id: localization.localizationId,
        },
      });

    if (localizationModel) {
      await this.databaseService.seLocalization.update({
        where: { id: localization.localizationId },
        data: {
          countryCode: localization.countryCode,
          domainParam: localization.domainParam,
          name: localization.name,
        },
      });
      return;
    }

    await this.databaseService.seLocalization.create({
      data: {
        id: localization.localizationId,
        countryCode: localization.countryCode,
        domainParam: localization.domainParam,
        name: localization.name,
      },
    });
  }

  async localizationExists(countryCode: string): Promise<boolean> {
    const localizationModel =
      await this.databaseService.seLocalization.findFirst({
        where: {
          countryCode,
        },
      });
    return !!localizationModel;
  }
}
