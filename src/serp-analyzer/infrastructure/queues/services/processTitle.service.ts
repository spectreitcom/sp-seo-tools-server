import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  TITLE_CHARACTERS_COUNT,
  TITLE_EXACT_KEYWORDS_COUNT,
  TITLE_EXACT_KEYWORDS_DENSITY,
  TITLE_PARTIAL_KEYWORDS_COUNT,
  TITLE_PARTIAL_KEYWORDS_DENSITY,
  TITLE_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessTitleService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const titleWordsCount = this.htmlParserFacade.titleWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, TITLE_WORDS_COUNT, titleWordsCount),
    );

    const titleCharactersCount =
      this.htmlParserFacade.titleCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        TITLE_CHARACTERS_COUNT,
        titleCharactersCount,
      ),
    );

    const titleExactKeywordsCount =
      this.htmlParserFacade.titleExactKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        TITLE_EXACT_KEYWORDS_COUNT,
        titleExactKeywordsCount,
      ),
    );

    const titleExactKeywordsDensity =
      this.htmlParserFacade.titleExactKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        TITLE_EXACT_KEYWORDS_DENSITY,
        titleExactKeywordsDensity,
      ),
    );

    const titlePartialKeywordsCount =
      this.htmlParserFacade.titlePartialKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        TITLE_PARTIAL_KEYWORDS_COUNT,
        titlePartialKeywordsCount,
      ),
    );

    const titlePartialKeywordsDensity =
      this.htmlParserFacade.titlePartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        TITLE_PARTIAL_KEYWORDS_DENSITY,
        titlePartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
