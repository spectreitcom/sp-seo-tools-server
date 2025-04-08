import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  H5_CHARACTERS_COUNT,
  H5_ELEMENTS_COUNT,
  H5_EXACT_KEYWORDS_COUNT,
  H5_EXACT_KEYWORDS_DENSITY,
  H5_PARTIAL_KEYWORDS_COUNT,
  H5_PARTIAL_KEYWORDS_DENSITY,
  H5_WORDS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessH5Service {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, phrase: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const h5WordsCount = this.htmlParserFacade.h5WordsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H5_WORDS_COUNT, h5WordsCount),
    );

    const h5CharactersCount = this.htmlParserFacade.h5CharactersCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H5_CHARACTERS_COUNT, h5CharactersCount),
    );

    const h5ElementsCount = this.htmlParserFacade.h5ElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, H5_ELEMENTS_COUNT, h5ElementsCount),
    );

    const h5ExactKeywordsCount = this.htmlParserFacade.h5ExactKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H5_EXACT_KEYWORDS_COUNT,
        h5ExactKeywordsCount,
      ),
    );

    const h5ExactKeywordsDensity = this.htmlParserFacade.h5ExactKeywordsDensity(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H5_EXACT_KEYWORDS_DENSITY,
        h5ExactKeywordsDensity,
      ),
    );

    const h5PartialKeywordsCount = this.htmlParserFacade.h5PartialKeywordsCount(
      html,
      phrase,
    );
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H5_PARTIAL_KEYWORDS_COUNT,
        h5PartialKeywordsCount,
      ),
    );

    const h5PartialKeywordsDensity =
      this.htmlParserFacade.h5PartialKeywordsDensity(html, phrase);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        H5_PARTIAL_KEYWORDS_DENSITY,
        h5PartialKeywordsDensity,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
