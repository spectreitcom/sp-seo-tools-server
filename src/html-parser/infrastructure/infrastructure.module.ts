import { Module } from '@nestjs/common';
import { ElementsCountService } from '../application/ports/elements-count.service';
import { AppElementsCountService } from './elements-count-service/app-elements-count.service';
import { CharactersCountService } from '../application/ports/characters-count.service';
import { AppCharactersCountService } from './characters-count-service/app-characters-count.service';
import { WordsCountService } from '../application/ports/words-count.service';
import { AppWordsCountService } from './words-count-service/app-words-count.service';

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
    {
      provide: WordsCountService,
      useClass: AppWordsCountService,
    },
  ],
  exports: [ElementsCountService, CharactersCountService, WordsCountService],
})
export class InfrastructureModule {}
