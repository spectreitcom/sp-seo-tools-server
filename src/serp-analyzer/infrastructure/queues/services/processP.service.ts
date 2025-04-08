import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  P_CHARACTERS_COUNT,
  P_ELEMENTS_COUNT,
  P_EXACT_KEYWORDS_COUNT,
  P_EXACT_KEYWORDS_DENSITY,
  P_PARTIAL_KEYWORDS_COUNT,
  P_PARTIAL_KEYWORDS_DENSITY,
  P_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessPService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const pWordsCount = this.htmlParserFacade.pWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, P_WORDS_COUNT, pWordsCount),
    );

    const pCharactersCount = this.htmlParserFacade.pCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, P_CHARACTERS_COUNT, pCharactersCount),
    );

    const pElementsCount = this.htmlParserFacade.pElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, P_ELEMENTS_COUNT, pElementsCount),
    );

    const pExactKeywordsCount = this.htmlParserFacade.pExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        P_EXACT_KEYWORDS_COUNT,
        pExactKeywordsCount,
      ),
    );

    const pExactKeywordsDensity = this.htmlParserFacade.pExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        P_EXACT_KEYWORDS_DENSITY,
        pExactKeywordsDensity,
      ),
    );

    const pPartialKeywordsCount = this.htmlParserFacade.pPartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        P_PARTIAL_KEYWORDS_COUNT,
        pPartialKeywordsCount,
      ),
    );

    const pPartialKeywordsDensity =
      this.htmlParserFacade.pPartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        P_PARTIAL_KEYWORDS_DENSITY,
        pPartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
