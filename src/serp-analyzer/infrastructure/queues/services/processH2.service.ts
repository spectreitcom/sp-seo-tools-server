import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H2_CHARACTERS_COUNT,
  H2_ELEMENTS_COUNT,
  H2_EXACT_KEYWORDS_COUNT,
  H2_EXACT_KEYWORDS_DENSITY,
  H2_PARTIAL_KEYWORDS_COUNT,
  H2_PARTIAL_KEYWORDS_DENSITY,
  H2_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH2Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h2WordsCount = this.htmlParserFacade.h2WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H2_WORDS_COUNT, h2WordsCount),
    );

    const h2CharactersCount = this.htmlParserFacade.h2CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H2_CHARACTERS_COUNT, h2CharactersCount),
    );

    const h2ElementsCount = this.htmlParserFacade.h2ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H2_ELEMENTS_COUNT, h2ElementsCount),
    );

    const h2ExactKeywordsCount = this.htmlParserFacade.h2ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H2_EXACT_KEYWORDS_COUNT,
        h2ExactKeywordsCount,
      ),
    );

    const h2ExactKeywordsDensity = this.htmlParserFacade.h2ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H2_EXACT_KEYWORDS_DENSITY,
        h2ExactKeywordsDensity,
      ),
    );

    const h2PartialKeywordsCount = this.htmlParserFacade.h2PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H2_PARTIAL_KEYWORDS_COUNT,
        h2PartialKeywordsCount,
      ),
    );

    const h2PartialKeywordsDensity =
      this.htmlParserFacade.h2PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H2_PARTIAL_KEYWORDS_DENSITY,
        h2PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
