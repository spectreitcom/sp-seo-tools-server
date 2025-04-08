import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  IMAGE_ELEMENTS_COUNT,
  IMAGE_ELEMENTS_WITH_ALT_COUNT,
  IMAGE_ELEMENTS_WITHOUT_OR_WITH_EMPTY_ALT_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessImageService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const imageElementsCount = this.htmlParserFacade.imageElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMAGE_ELEMENTS_COUNT,
        imageElementsCount,
      ),
    );

    const imageElementsWithAltCount =
      this.htmlParserFacade.imageElementsWithAltCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMAGE_ELEMENTS_WITH_ALT_COUNT,
        imageElementsWithAltCount,
      ),
    );

    const imageElementsWithoutOrWithEmptyAltCount =
      this.htmlParserFacade.imageElementsWithoutOrWithEmptyAltCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        IMAGE_ELEMENTS_WITHOUT_OR_WITH_EMPTY_ALT_COUNT,
        imageElementsWithoutOrWithEmptyAltCount,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
