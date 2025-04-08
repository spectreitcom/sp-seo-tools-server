import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H4_CHARACTERS_COUNT,
  H4_ELEMENTS_COUNT,
  H4_EXACT_KEYWORDS_COUNT,
  H4_EXACT_KEYWORDS_DENSITY,
  H4_PARTIAL_KEYWORDS_COUNT,
  H4_PARTIAL_KEYWORDS_DENSITY,
  H4_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH4Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h4WordsCount = this.htmlParserFacade.h4WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H4_WORDS_COUNT, h4WordsCount),
    );

    const h4CharactersCount = this.htmlParserFacade.h4CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H4_CHARACTERS_COUNT, h4CharactersCount),
    );

    const h4ElementsCount = this.htmlParserFacade.h4ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H4_ELEMENTS_COUNT, h4ElementsCount),
    );

    const h4ExactKeywordsCount = this.htmlParserFacade.h4ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H4_EXACT_KEYWORDS_COUNT,
        h4ExactKeywordsCount,
      ),
    );

    const h4ExactKeywordsDensity = this.htmlParserFacade.h4ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H4_EXACT_KEYWORDS_DENSITY,
        h4ExactKeywordsDensity,
      ),
    );

    const h4PartialKeywordsCount = this.htmlParserFacade.h4PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H4_PARTIAL_KEYWORDS_COUNT,
        h4PartialKeywordsCount,
      ),
    );

    const h4PartialKeywordsDensity =
      this.htmlParserFacade.h4PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H4_PARTIAL_KEYWORDS_DENSITY,
        h4PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
