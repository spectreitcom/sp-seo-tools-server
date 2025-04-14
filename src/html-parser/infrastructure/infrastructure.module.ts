import { Module } from '@nestjs/common';
import { ElementsCountService } from '../application/ports/elements-count.service';
import { AppElementsCountService } from './elements-count-service/app-elements-count.service';
import { CharactersCountService } from '../application/ports/characters-count.service';
import { AppCharactersCountService } from './characters-count-service/app-characters-count.service';
import { WordsCountService } from '../application/ports/words-count.service';
import { AppWordsCountService } from './words-count-service/app-words-count.service';
import { ExactKeywordsCountService } from '../application/ports/exact-keywords-count.service';
import { AppExactKeywordsCountService } from './exact-keywords-count-service/app-exact-keywords-count.service';
import { ExactKeywordsDensityService } from '../application/ports/exact-keywords-density.service';
import { AppExactKeywordsDensityService } from './exact-keywords-density-service/app-exact-keywords-density.service';
import { PartialKeywordsCountService } from '../application/ports/partial-keywords-count.service';
import { AppPartialKeywordsCountService } from './partial-keywords-count-service/app-partial-keywords-count.service';

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
    {
      provide: ExactKeywordsCountService,
      useClass: AppExactKeywordsCountService,
    },
    {
      provide: ExactKeywordsDensityService,
      useClass: AppExactKeywordsDensityService,
    },
    {
      provide: PartialKeywordsCountService,
      useClass: AppPartialKeywordsCountService,
    },
  ],
  exports: [
    ElementsCountService,
    CharactersCountService,
    WordsCountService,
    ExactKeywordsCountService,
    ExactKeywordsDensityService,
    PartialKeywordsCountService,
  ],
})
export class InfrastructureModule {}
