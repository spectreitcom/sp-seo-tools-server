import { Module } from '@nestjs/common';
import { PageSpeedFacade } from './page-speed.facade';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [PageSpeedFacade],
  exports: [PageSpeedFacade],
})
export class PageSpeedModule {}
