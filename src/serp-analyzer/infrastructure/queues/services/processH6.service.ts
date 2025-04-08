import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H6_CHARACTERS_COUNT,
  H6_ELEMENTS_COUNT,
  H6_EXACT_KEYWORDS_COUNT,
  H6_EXACT_KEYWORDS_DENSITY,
  H6_PARTIAL_KEYWORDS_COUNT,
  H6_PARTIAL_KEYWORDS_DENSITY,
  H6_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH6Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h6WordsCount = this.htmlParserFacade.h6WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H6_WORDS_COUNT, h6WordsCount),
    );

    const h6CharactersCount = this.htmlParserFacade.h6CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H6_CHARACTERS_COUNT, h6CharactersCount),
    );

    const h6ElementsCount = this.htmlParserFacade.h6ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H6_ELEMENTS_COUNT, h6ElementsCount),
    );

    const h6ExactKeywordsCount = this.htmlParserFacade.h6ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H6_EXACT_KEYWORDS_COUNT,
        h6ExactKeywordsCount,
      ),
    );

    const h6ExactKeywordsDensity = this.htmlParserFacade.h6ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H6_EXACT_KEYWORDS_DENSITY,
        h6ExactKeywordsDensity,
      ),
    );

    const h6PartialKeywordsCount = this.htmlParserFacade.h6PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H6_PARTIAL_KEYWORDS_COUNT,
        h6PartialKeywordsCount,
      ),
    );

    const h6PartialKeywordsDensity =
      this.htmlParserFacade.h6PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H6_PARTIAL_KEYWORDS_DENSITY,
        h6PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
