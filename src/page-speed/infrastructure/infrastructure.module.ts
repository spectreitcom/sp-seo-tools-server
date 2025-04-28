import { Module } from '@nestjs/common';
import { PageSpeedDataService } from '../application/ports/page-speed-data.service';
import { AppPageSpeedDataService } from './app-page-speed-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: PageSpeedDataService,
      useClass: AppPageSpeedDataService,
    },
  ],
  exports: [PageSpeedDataService],
})
export class InfrastructureModule {}
