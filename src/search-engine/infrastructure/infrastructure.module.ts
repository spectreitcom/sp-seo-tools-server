import { Module } from '@nestjs/common';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/repositories/prisma-localization.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: LocalizationRepository, useClass: PrismaLocalizationRepository },
  ],
  exports: [LocalizationRepository],
})
export class InfrastructureModule {}
