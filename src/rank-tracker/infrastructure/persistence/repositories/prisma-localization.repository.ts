import { Injectable } from '@nestjs/common';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { Localization } from '../../../domain/localization';
import { DatabaseService } from '../../../../database/database.service';
import { LocalizationMapper } from '../../../domain/mappers/localization.mapper';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaLocalizationRepository implements LocalizationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(localization: Localization, prisma?: PrismaClient): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;

    const localizationModel = await prismaClient.rtLocalization.findFirst({
      where: { id: localization.localizationId },
    });

    if (localizationModel) {
      await prismaClient.rtLocalization.update({
        where: { id: localization.localizationId },
        data: {
          countryCode: localization.countryCode,
          domainParam: localization.domainParam,
          name: localization.name,
        },
      });
      return;
    }

    await prismaClient.rtLocalization.create({
      data: {
        id: localization.localizationId,
        domainParam: localization.domainParam,
        countryCode: localization.countryCode,
        name: localization.name,
      },
    });
  }

  async findById(
    localizationId: string,
    prisma?: PrismaClient,
  ): Promise<Localization> {
    const prismaClient = prisma ?? this.databaseService;
    const localizationModel = await prismaClient.rtLocalization.findFirst({
      where: {
        id: localizationId,
      },
    });

    if (!localizationModel) return null;

    return LocalizationMapper.toDomain(localizationModel);
  }

  async findAll(prisma?: PrismaClient): Promise<Localization[]> {
    const prismaClient = prisma ?? this.databaseService;
    const models = await prismaClient.rtLocalization.findMany();
    return models.map((model) => LocalizationMapper.toDomain(model));
  }

  async findByCountryCode(
    countryCode: string,
    prisma?: PrismaClient,
  ): Promise<Localization> {
    const prismaClient = prisma ?? this.databaseService;
    const model = await prismaClient.rtLocalization.findUnique({
      where: { countryCode },
    });
    if (!model) return null;
    return LocalizationMapper.toDomain(model);
  }
}
