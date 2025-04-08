import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  META_DESC_CHARACTERS_COUNT,
  META_DESC_EXACT_KEYWORDS_COUNT,
  META_DESC_EXACT_KEYWORDS_DENSITY,
  META_DESC_PARTIAL_KEYWORDS_COUNT,
  META_DESC_PARTIAL_KEYWORDS_DENSITY,
  META_DESC_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessMetaDescService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const metaDescWordsCount =
      this.htmlParserFacade.metaDescriptionWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_WORDS_COUNT,
        metaDescWordsCount,
      ),
    );

    const metaDescCharactersCount =
      this.htmlParserFacade.metaDescriptionCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_CHARACTERS_COUNT,
        metaDescCharactersCount,
      ),
    );

    const metaDescExactKeywordsCount =
      this.htmlParserFacade.metaDescriptionExactKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_EXACT_KEYWORDS_COUNT,
        metaDescExactKeywordsCount,
      ),
    );

    const metaDescExactKeywordsDensity =
      this.htmlParserFacade.metaDescriptionExactKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_EXACT_KEYWORDS_DENSITY,
        metaDescExactKeywordsDensity,
      ),
    );

    const metaDescPartialKeywordsCount =
      this.htmlParserFacade.metaDescriptionPartialKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_PARTIAL_KEYWORDS_COUNT,
        metaDescPartialKeywordsCount,
      ),
    );

    const metaDescPartialKeywordsDensity =
      this.htmlParserFacade.metaDescriptionPartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        META_DESC_PARTIAL_KEYWORDS_DENSITY,
        metaDescPartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
