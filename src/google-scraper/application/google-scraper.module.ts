import { Module } from '@nestjs/common';
import { GoogleScraperFacade } from './google-scraper.facade';
import InfrastructureModule from '../infrastructure/infrastructure.module';
import { ScrapingFinishedEventHandler } from './event-handlers/scraping-finished.event-handler';
import { CheckingQueryCron } from './cron/checking-query.cron';
import { ExceededTimeLimitEventHandler } from './event-handlers/exceeded-time-limit.event-handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    GoogleScraperFacade,
    ScrapingFinishedEventHandler,
    CheckingQueryCron,
    ExceededTimeLimitEventHandler,
  ],
  exports: [GoogleScraperFacade],
})
export class GoogleScraperModule {}
