import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  STRONG_CHARACTERS_COUNT,
  STRONG_ELEMENTS_COUNT,
  STRONG_EXACT_KEYWORDS_COUNT,
  STRONG_EXACT_KEYWORDS_DENSITY,
  STRONG_PARTIAL_KEYWORDS_COUNT,
  STRONG_PARTIAL_KEYWORDS_DENSITY,
  STRONG_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessStrongService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const strongWordsCount = this.htmlParserFacade.strongWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, STRONG_WORDS_COUNT, strongWordsCount),
    );

    const strongCharactersCount =
      this.htmlParserFacade.strongCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_CHARACTERS_COUNT,
        strongCharactersCount,
      ),
    );

    const strongElementsCount = this.htmlParserFacade.strongElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_ELEMENTS_COUNT,
        strongElementsCount,
      ),
    );

    const strongExactKeywordsCount =
      this.htmlParserFacade.strongExactKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_EXACT_KEYWORDS_COUNT,
        strongExactKeywordsCount,
      ),
    );

    const strongExactKeywordsDensity =
      this.htmlParserFacade.strongExactKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_EXACT_KEYWORDS_DENSITY,
        strongExactKeywordsDensity,
      ),
    );

    const strongPartialKeywordsCount =
      this.htmlParserFacade.strongPartialKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_PARTIAL_KEYWORDS_COUNT,
        strongPartialKeywordsCount,
      ),
    );

    const strongPartialKeywordsDensity =
      this.htmlParserFacade.strongPartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        STRONG_PARTIAL_KEYWORDS_DENSITY,
        strongPartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
