import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  BODY_CHARACTERS_COUNT,
  BODY_EXACT_KEYWORDS_COUNT,
  BODY_EXACT_KEYWORDS_DENSITY,
  BODY_PARTIAL_KEYWORDS_COUNT,
  BODY_PARTIAL_KEYWORDS_DENSITY,
  BODY_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';

@Injectable()
export class ProcessBodyService {
  constructor(private readonly htmlParserFacade: HtmlParserFacade) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const bodyWordsCount = this.htmlParserFacade.bodyWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, BODY_WORDS_COUNT, bodyWordsCount),
    );

    const bodyCharactersCount = this.htmlParserFacade.bodyCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        BODY_CHARACTERS_COUNT,
        bodyCharactersCount,
      ),
    );

    const bodyExactKeywordsCount = this.htmlParserFacade.bodyExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        BODY_EXACT_KEYWORDS_COUNT,
        bodyExactKeywordsCount,
      ),
    );

    const bodyExactKeywordsDensity =
      this.htmlParserFacade.bodyExactKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        BODY_EXACT_KEYWORDS_DENSITY,
        bodyExactKeywordsDensity,
      ),
    );

    const bodyPartialKeywordsCount =
      this.htmlParserFacade.bodyPartialKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        BODY_PARTIAL_KEYWORDS_COUNT,
        bodyPartialKeywordsCount,
      ),
    );

    const bodyPartialKeywordsDensity =
      this.htmlParserFacade.bodyPartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        BODY_PARTIAL_KEYWORDS_DENSITY,
        bodyPartialKeywordsDensity,
      ),
    );

    return pageFactors;
  }
}
