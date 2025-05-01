import { Module } from '@nestjs/common';
import { PageSpeedDataService } from '../application/ports/page-speed-data.service';
import { AppPageSpeedDataService } from './app-page-speed-data.service';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [
    {
      provide: PageSpeedDataService,
      useClass: AppPageSpeedDataService,
    },
  ],
  exports: [PageSpeedDataService],
})
export class InfrastructureModule {}
