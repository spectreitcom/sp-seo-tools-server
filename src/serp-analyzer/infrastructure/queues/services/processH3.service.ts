import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H3_CHARACTERS_COUNT,
  H3_ELEMENTS_COUNT,
  H3_EXACT_KEYWORDS_COUNT,
  H3_EXACT_KEYWORDS_DENSITY,
  H3_PARTIAL_KEYWORDS_COUNT,
  H3_PARTIAL_KEYWORDS_DENSITY,
  H3_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH3Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h3WordsCount = this.htmlParserFacade.h2WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H3_WORDS_COUNT, h3WordsCount),
    );

    const h3CharactersCount = this.htmlParserFacade.h3CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H3_CHARACTERS_COUNT, h3CharactersCount),
    );

    const h3ElementsCount = this.htmlParserFacade.h3ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H3_ELEMENTS_COUNT, h3ElementsCount),
    );

    const h3ExactKeywordsCount = this.htmlParserFacade.h3ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H3_EXACT_KEYWORDS_COUNT,
        h3ExactKeywordsCount,
      ),
    );

    const h3ExactKeywordsDensity = this.htmlParserFacade.h3ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H3_EXACT_KEYWORDS_DENSITY,
        h3ExactKeywordsDensity,
      ),
    );

    const h3PartialKeywordsCount = this.htmlParserFacade.h3PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H3_PARTIAL_KEYWORDS_COUNT,
        h3PartialKeywordsCount,
      ),
    );

    const h3PartialKeywordsDensity =
      this.htmlParserFacade.h3PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H3_PARTIAL_KEYWORDS_DENSITY,
        h3PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
