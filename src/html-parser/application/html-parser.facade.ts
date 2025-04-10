import { Injectable } from '@nestjs/common';
import { ElementsCountService } from './ports/elements-count.service';
import { CharactersCountService } from './ports/characters-count.service';

@Injectable()
export class HtmlParserFacade {
  constructor(
    private readonly elementsCountService: ElementsCountService,
    private readonly charactersCountService: CharactersCountService,
  ) {}

  // H1

  h1WordsCount(html: string): number {
    return 0;
  }

  h1CharactersCount(html: string): number {
    return this.charactersCountService.h1CharactersCount(html);
  }

  h1ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h1ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h1PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h1PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h1ElementsCount(html: string): number {
    return this.elementsCountService.h1ElementsCount(html);
  }

  // H2

  h2WordsCount(html: string): number {
    return 0;
  }

  h2CharactersCount(html: string): number {
    return this.charactersCountService.h2CharactersCount(html);
  }

  h2ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h2ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h2PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h2PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h2ElementsCount(html: string): number {
    return this.elementsCountService.h2ElementsCount(html);
  }

  // H3

  h3WordsCount(html: string): number {
    return 0;
  }

  h3CharactersCount(html: string): number {
    return this.charactersCountService.h3CharactersCount(html);
  }

  h3ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h3ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h3PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h3PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h3ElementsCount(html: string): number {
    return this.elementsCountService.h3ElementsCount(html);
  }

  // H4

  h4WordsCount(html: string): number {
    return 0;
  }

  h4CharactersCount(html: string): number {
    return this.charactersCountService.h4CharactersCount(html);
  }

  h4ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h4ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h4PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h4PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h4ElementsCount(html: string): number {
    return this.elementsCountService.h4ElementsCount(html);
  }

  // H5

  h5WordsCount(html: string): number {
    return 0;
  }

  h5CharactersCount(html: string): number {
    return this.charactersCountService.h5CharactersCount(html);
  }

  h5ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h5ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h5PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h5PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h5ElementsCount(html: string): number {
    return this.elementsCountService.h5ElementsCount(html);
  }

  // H6

  h6WordsCount(html: string): number {
    return 0;
  }

  h6CharactersCount(html: string): number {
    return this.charactersCountService.h6CharactersCount(html);
  }

  h6ExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h6ExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h6PartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  h6PartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  h6ElementsCount(html: string): number {
    return this.elementsCountService.h6ElementsCount(html);
  }

  // P

  pWordsCount(html: string): number {
    return 0;
  }

  pCharactersCount(html: string): number {
    return this.charactersCountService.pCharactersCount(html);
  }

  pExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  pExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  pPartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  pPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  pElementsCount(html: string): number {
    return this.elementsCountService.pElementsCount(html);
  }

  // Strong/b

  strongWordsCount(html: string): number {
    return 0;
  }

  strongCharactersCount(html: string): number {
    return this.charactersCountService.strongCharactersCount(html);
  }

  strongExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  strongExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  strongPartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  strongPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  strongElementsCount(html: string): number {
    return this.elementsCountService.strongElementsCount(html);
  }

  // Image alt

  imgAltWordsCount(html: string): number {
    return 0;
  }

  imgAltCharactersCount(html: string): number {
    return this.charactersCountService.imgAltCharactersCount(html);
  }

  imgAltElementsCount(html: string): number {
    return 0;
  }

  imgAltExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  imgAltExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  imgAltPartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  imgAltPartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Title

  titleWordsCount(html: string): number {
    return 0;
  }

  titleCharactersCount(html: string): number {
    return this.charactersCountService.titleCharactersCount(html);
  }

  titleExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  titleExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  titlePartialKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  titlePartialKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  // Meta description

  metaDescriptionWordsCount(html: string): number {
    return 0;
  }

  metaDescriptionCharactersCount(html: string): number {
    return this.charactersCountService.metaDescriptionCharactersCount(html);
  }

  metaDescriptionExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  metaDescriptionExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  metaDescriptionPartialKeywordsCount(html: string, phrase: string): number {
    return 0;
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
    return 0;
  }

  bodyCharactersCount(html: string): number {
    return this.charactersCountService.bodyCharactersCount(html);
  }

  bodyExactKeywordsCount(html: string, phrase: string): number {
    return 0;
  }

  bodyExactKeywordsDensity(html: string, phrase: string): number {
    return 0;
  }

  bodyPartialKeywordsCount(html: string, phrase: string): number {
    return 0;
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
