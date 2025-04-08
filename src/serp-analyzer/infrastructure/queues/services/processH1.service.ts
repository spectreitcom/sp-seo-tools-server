import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H1_CHARACTERS_COUNT,
  H1_ELEMENTS_COUNT,
  H1_EXACT_KEYWORDS_COUNT,
  H1_EXACT_KEYWORDS_DENSITY,
  H1_PARTIAL_KEYWORDS_COUNT,
  H1_PARTIAL_KEYWORDS_DENSITY,
  H1_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH1Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h1WordsCount = this.htmlParserFacade.h1WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H1_WORDS_COUNT, h1WordsCount),
    );

    const h1CharactersCount = this.htmlParserFacade.h1CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H1_CHARACTERS_COUNT, h1CharactersCount),
    );

    const h1ElementsCount = this.htmlParserFacade.h1ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H1_ELEMENTS_COUNT, h1ElementsCount),
    );

    const h1ExactKeywordsCount = this.htmlParserFacade.h1ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H1_EXACT_KEYWORDS_COUNT,
        h1ExactKeywordsCount,
      ),
    );

    const h1ExactKeywordsDensity = this.htmlParserFacade.h1ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H1_EXACT_KEYWORDS_DENSITY,
        h1ExactKeywordsDensity,
      ),
    );

    const h1PartialKeywordsCount = this.htmlParserFacade.h1PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H1_PARTIAL_KEYWORDS_COUNT,
        h1PartialKeywordsCount,
      ),
    );

    const h1PartialKeywordsDensity =
      this.htmlParserFacade.h1PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H1_PARTIAL_KEYWORDS_DENSITY,
        h1PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
