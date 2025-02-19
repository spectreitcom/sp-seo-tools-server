import { Module } from '@nestjs/common';
import { SearchEngineRepository } from '../application/ports/search-engine.repository';
import { PrismaSearchEngineRepository } from './persistence/repositories/prisma-search-engine.repository';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/repositories/prisma-localization.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: SearchEngineRepository, useClass: PrismaSearchEngineRepository },
    { provide: LocalizationRepository, useClass: PrismaLocalizationRepository },
  ],
  exports: [SearchEngineRepository, LocalizationRepository],
})
export class InfrastructureModule {}
