import { Module } from '@nestjs/common';
import { ElementsCountService } from '../application/ports/elements-count.service';
import { AppElementsCountService } from './elements-count-service/app-elements-count.service';
import { CharactersCountService } from '../application/ports/characters-count.service';
import { AppCharactersCountService } from './characters-count-service/app-characters-count.service';

@Module({
  imports: [],
  providers: [
    {
      provide: ElementsCountService,
      useClass: AppElementsCountService,
    },
    {
      provide: CharactersCountService,
      useClass: AppCharactersCountService,
    },
  ],
  exports: [ElementsCountService, CharactersCountService],
})
export class InfrastructureModule {}
