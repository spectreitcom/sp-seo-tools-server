import { Module } from '@nestjs/common';
import { GoogleScraperService } from '../application/ports/google-scraper.service';
import { AppGoogleScraperService } from './google-scraper-service/app-google-scraper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: GoogleScraperService,
      useClass: AppGoogleScraperService,
    },
  ],
  exports: [GoogleScraperService],
})
export default class InfrastructureModule {}
