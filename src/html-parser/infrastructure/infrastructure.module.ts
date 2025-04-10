import { Module } from '@nestjs/common';
import { ElementsCountService } from '../application/ports/elements-count.service';
import { AppElementsCountService } from './elements-count-service/app-elements-count.service';

@Module({
  imports: [],
  providers: [
    {
      provide: ElementsCountService,
      useClass: AppElementsCountService,
    },
  ],
  exports: [ElementsCountService],
})
export class InfrastructureModule {}
