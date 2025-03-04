import { Injectable } from '@nestjs/common';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { Localization } from '../../../domain/localization';
import { DatabaseService } from '../../../../database/database.service';
import { LocalizationMapper } from '../../../domain/mappers/localization.mapper';

@Injectable()
export class PrismaLocalizationRepository implements LocalizationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(localization: Localization): Promise<void> {
    const localizationModel =
      await this.databaseService.rtLocalization.findFirst({
        where: { id: localization.localizationId },
      });

    if (localizationModel) {
      await this.databaseService.rtLocalization.update({
        where: { id: localization.localizationId },
        data: {
          countryCode: localization.countryCode,
          searchEngineId: localization.searchEngineId,
          domainParam: localization.domainParam,
          seLocalizationId: localization.seLocalizationId,
          name: localization.name,
        },
      });
      return;
    }

    await this.databaseService.rtLocalization.create({
      data: {
        id: localization.localizationId,
        searchEngineId: localization.searchEngineId,
        domainParam: localization.domainParam,
        countryCode: localization.countryCode,
        seLocalizationId: localization.seLocalizationId,
        name: localization.name,
      },
    });
  }

  async findById(localizationId: string): Promise<Localization> {
    const localizationModel =
      await this.databaseService.rtLocalization.findFirst({
        where: {
          id: localizationId,
        },
      });

    if (!localizationModel) return null;

    return LocalizationMapper.toDomain(localizationModel);
  }

  async findBySearchEngine(searchEngineId: string): Promise<Localization[]> {
    const models = await this.databaseService.rtLocalization.findMany({
      where: {
        searchEngineId,
      },
    });
    return models.map((model) => LocalizationMapper.toDomain(model));
  }
}
