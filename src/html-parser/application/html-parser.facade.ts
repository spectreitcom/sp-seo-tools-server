import { Injectable } from '@nestjs/common';
import { ElementsCountService } from './ports/elements-count.service';
import { CharactersCountService } from './ports/characters-count.service';
import { WordsCountService } from './ports/words-count.service';
import { ExactKeywordsCountService } from './ports/exact-keywords-count.service';
import { ExactKeywordsDensityService } from './ports/exact-keywords-density.service';
import { PartialKeywordsCountService } from './ports/partial-keywords-count.service';

@Injectable()
export class HtmlParserFacade {
  constructor(
    private readonly elementsCountService: ElementsCountService,
    private readonly charactersCountService: CharactersCountService,
    private readonly wordsCountService: WordsCountService,
    private readonly exactKeywordsCountService: ExactKeywordsCountService,
    private readonly exactKeywordsDensityService: ExactKeywordsDensityService,
    private readonly partialKeywordsCountService: PartialKeywordsCountService,
  ) {}

  // H1

  h1WordsCount(html: string): number {
    return this.wordsCountService.h1WordsCount(html);
  }

  h1CharactersCount(html: string): number {
    return this.charactersCountService.h1CharactersCount(html);
  }

  h1ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h1ExactKeywordsCount(html, phrase);
  }

  h1ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h1ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h1PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h1PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h1PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h1ElementsCount(html: string): number {
    return this.elementsCountService.h1ElementsCount(html);
  }

  // H2

  h2WordsCount(html: string): number {
    return this.wordsCountService.h2WordsCount(html);
  }

  h2CharactersCount(html: string): number {
    return this.charactersCountService.h2CharactersCount(html);
  }

  h2ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h2ExactKeywordsCount(html, phrase);
  }

  h2ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h2ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h2PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h2PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h2PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h2ElementsCount(html: string): number {
    return this.elementsCountService.h2ElementsCount(html);
  }

  // H3

  h3WordsCount(html: string): number {
    return this.wordsCountService.h3WordsCount(html);
  }

  h3CharactersCount(html: string): number {
    return this.charactersCountService.h3CharactersCount(html);
  }

  h3ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h3ExactKeywordsCount(html, phrase);
  }

  h3ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h3ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h3PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h3PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h3PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h3ElementsCount(html: string): number {
    return this.elementsCountService.h3ElementsCount(html);
  }

  // H4

  h4WordsCount(html: string): number {
    return this.wordsCountService.h4WordsCount(html);
  }

  h4CharactersCount(html: string): number {
    return this.charactersCountService.h4CharactersCount(html);
  }

  h4ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h4ExactKeywordsCount(html, phrase);
  }

  h4ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h4ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h4PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h4PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h4PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h4ElementsCount(html: string): number {
    return this.elementsCountService.h4ElementsCount(html);
  }

  // H5

  h5WordsCount(html: string): number {
    return this.wordsCountService.h5WordsCount(html);
  }

  h5CharactersCount(html: string): number {
    return this.charactersCountService.h5CharactersCount(html);
  }

  h5ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h5ExactKeywordsCount(html, phrase);
  }

  h5ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h5ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h5PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h5PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h5PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h5ElementsCount(html: string): number {
    return this.elementsCountService.h5ElementsCount(html);
  }

  // H6

  h6WordsCount(html: string): number {
    return this.wordsCountService.h6WordsCount(html);
  }

  h6CharactersCount(html: string): number {
    return this.charactersCountService.h6CharactersCount(html);
  }

  h6ExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.h6ExactKeywordsCount(html, phrase);
  }

  h6ExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.h6ExactKeywordsDensity(
      html,
      phrase,
    );
  }

  h6PartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.h6PartialKeywordsCount(
      html,
      phrase,
    );
  }

  h6PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h6ElementsCount(html: string): number {
    return this.elementsCountService.h6ElementsCount(html);
  }

  // P

  pWordsCount(html: string): number {
    return this.wordsCountService.pWordsCount(html);
  }

  pCharactersCount(html: string): number {
    return this.charactersCountService.pCharactersCount(html);
  }

  pExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.pExactKeywordsCount(html, phrase);
  }

  pExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.pExactKeywordsDensity(html, phrase);
  }

  pPartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.pPartialKeywordsCount(html, phrase);
  }

  pPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  pElementsCount(html: string): number {
    return this.elementsCountService.pElementsCount(html);
  }

  // Strong/b

  strongWordsCount(html: string): number {
    return this.wordsCountService.strongWordsCount(html);
  }

  strongCharactersCount(html: string): number {
    return this.charactersCountService.strongCharactersCount(html);
  }

  strongExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.strongExactKeywordsCount(
      html,
      phrase,
    );
  }

  strongExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.strongExactKeywordsDensity(
      html,
      phrase,
    );
  }

  strongPartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.strongPartialKeywordsCount(
      html,
      phrase,
    );
  }

  strongPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  strongElementsCount(html: string): number {
    return this.elementsCountService.strongElementsCount(html);
  }

  // Image alt

  imgAltWordsCount(html: string): number {
    return this.wordsCountService.imgAltWordsCount(html);
  }

  imgAltCharactersCount(html: string): number {
    return this.charactersCountService.imgAltCharactersCount(html);
  }

  imgAltElementsCount(html: string): number {
    return 0; // todo????
  }

  imgAltExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.imgAltExactKeywordsCount(
      html,
      phrase,
    );
  }

  imgAltExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.imgAltExactKeywordsDensity(
      html,
      phrase,
    );
  }

  imgAltPartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.imgAltPartialKeywordsCount(
      html,
      phrase,
    );
  }

  imgAltPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Title

  titleWordsCount(html: string): number {
    return this.wordsCountService.titleWordsCount(html);
  }

  titleCharactersCount(html: string): number {
    return this.charactersCountService.titleCharactersCount(html);
  }

  titleExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.titleExactKeywordsCount(html, phrase);
  }

  titleExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.titleExactKeywordsDensity(
      html,
      phrase,
    );
  }

  titlePartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.titlePartialKeywordsCount(
      html,
      phrase,
    );
  }

  titlePartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Meta description

  metaDescriptionWordsCount(html: string): number {
    return this.wordsCountService.metaDescriptionWordsCount(html);
  }

  metaDescriptionCharactersCount(html: string): number {
    return this.charactersCountService.metaDescriptionCharactersCount(html);
  }

  metaDescriptionExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.metaDescriptionExactKeywordsCount(
      html,
      phrase,
    );
  }

  metaDescriptionExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.metaDescriptionExactKeywordsDensity(
      html,
      phrase,
    );
  }

  metaDescriptionPartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.metaDescriptionPartialKeywordsCount(
      html,
      phrase,
    );
  }

  metaDescriptionPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Links

  linkElementsCount(html: string): number {
    return this.elementsCountService.linkElementsCount(html);
  }

  linkNofollowElementsCount(html: string): number {
    return this.elementsCountService.linkNofollowElementsCount(html);
  }

  linkDofollowElementsCount(html: string): number {
    return this.elementsCountService.linkDofollowElementsCount(html);
  }

  // Body

  bodyWordsCount(html: string): number {
    return this.wordsCountService.bodyWordsCount(html);
  }

  bodyCharactersCount(html: string): number {
    return this.charactersCountService.bodyCharactersCount(html);
  }

  bodyExactKeywordsCount(html: string, phrase: string): number {
    return this.exactKeywordsCountService.bodyExactKeywordsCount(html, phrase);
  }

  bodyExactKeywordsDensity(html: string, phrase: string): number {
    return this.exactKeywordsDensityService.bodyExactKeywordsDensity(
      html,
      phrase,
    );
  }

  bodyPartialKeywordsCount(html: string, phrase: string): number {
    return this.partialKeywordsCountService.bodyPartialKeywordsCount(
      html,
      phrase,
    );
  }

  bodyPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Image

  imageElementsCount(html: string): number {
    return this.elementsCountService.imageElementsCount(html);
  }

  imageElementsWithAltCount(html: string): number {
    return this.elementsCountService.imageElementsWithAltCount(html);
  }

  imageElementsWithoutOrWithEmptyAltCount(html: string): number {
    return this.elementsCountService.imageElementsWithoutOrWithEmptyAltCount(
      html,
    );
  }
}
