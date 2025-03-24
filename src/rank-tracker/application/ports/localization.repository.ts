import { PrismaClient } from '@prisma/client';
import { Localization } from '../../domain/localization';

export abstract class LocalizationRepository {
  abstract save(
    localization: Localization,
    prisma?: PrismaClient,
  ): Promise<void>;
  abstract findById(
    localizationId: string,
    prisma?: PrismaClient,
  ): Promise<Localization>;
  abstract findAll(prisma?: PrismaClient): Promise<Localization[]>;
  abstract findByCountryCode(
    countryCode: string,
    prisma?: PrismaClient,
  ): Promise<Localization>;
}
