import { Module } from '@nestjs/common';
import { GoogleScraperService } from '../application/ports/google-scraper.service';
import { AppGoogleScraperService } from './google-scraper-service/app-google-scraper.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AppGoogleScraperDevService } from './google-scraper-service/app-google-scraper-dev.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: GoogleScraperService,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        configService.get<string>('NODE_ENV') === 'production'
          ? new AppGoogleScraperService(configService, httpService)
          : new AppGoogleScraperDevService(),
      inject: [HttpService, ConfigService],
    },
  ],
  exports: [GoogleScraperService],
})
export default class InfrastructureModule {}
