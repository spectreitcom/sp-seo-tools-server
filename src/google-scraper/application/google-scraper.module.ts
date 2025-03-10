import { Module } from '@nestjs/common';
import { GoogleScraperFacade } from './google-scraper.facade';
import InfrastructureModule from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [GoogleScraperFacade],
  exports: [GoogleScraperFacade],
})
export class GoogleScraperModule {}
