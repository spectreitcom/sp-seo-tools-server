import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  IMG_ALT_CHARACTERS_COUNT,
  IMG_ALT_EXACT_KEYWORDS_COUNT,
  IMG_ALT_EXACT_KEYWORDS_DENSITY,
  IMG_ALT_PARTIAL_KEYWORDS_COUNT,
  IMG_ALT_PARTIAL_KEYWORDS_DENSITY,
  IMG_ALT_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessImgAltService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const imgAltWordsCount = this.htmlParserFacade.imgAltWordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, IMG_ALT_WORDS_COUNT, imgAltWordsCount),
    );

    const imgAltCharactersCount =
      this.htmlParserFacade.imgAltCharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMG_ALT_CHARACTERS_COUNT,
        imgAltCharactersCount,
      ),
    );

    const imgAltExactKeywordsCount =
      this.htmlParserFacade.imgAltExactKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMG_ALT_EXACT_KEYWORDS_COUNT,
        imgAltExactKeywordsCount,
      ),
    );

    const imgAltExactKeywordsDensity =
      this.htmlParserFacade.imgAltExactKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMG_ALT_EXACT_KEYWORDS_DENSITY,
        imgAltExactKeywordsDensity,
      ),
    );

    const imgAltPartialKeywordsCount =
      this.htmlParserFacade.imgAltPartialKeywordsCount(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMG_ALT_PARTIAL_KEYWORDS_COUNT,
        imgAltPartialKeywordsCount,
      ),
    );

    const imgAltPartialKeywordsDensity =
      this.htmlParserFacade.imgAltPartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMG_ALT_PARTIAL_KEYWORDS_DENSITY,
        imgAltPartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
