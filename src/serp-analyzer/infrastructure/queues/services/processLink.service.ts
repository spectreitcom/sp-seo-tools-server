import { Injectable } from '@nestjs/common';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  LINK_DOFOLLOW_ELEMENTS_COUNT,
  LINK_ELEMENTS_COUNT,
  LINK_NOFOLLOW_ELEMENTS_COUNT,
} from '../../factors';
import { HtmlParserFacade } from '../../../../html-parser/application/html-parser.facade';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';

@Injectable()
export class ProcessLinkService {
  constructor(
    private readonly htmlParserFacade: HtmlParserFacade,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async process(html: string, pageId: string) {
    const pageFactors: PageFactor[] = [];

    const linkElementsCount = this.htmlParserFacade.linkElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(pageId, LINK_ELEMENTS_COUNT, linkElementsCount),
    );

    const linkNofollowElementsCount =
      this.htmlParserFacade.linkNofollowElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        LINK_NOFOLLOW_ELEMENTS_COUNT,
        linkNofollowElementsCount,
      ),
    );

    const linkDofollowElementsCount =
      this.htmlParserFacade.linkDofollowElementsCount(html);
    pageFactors.push(
      PageFactorFactory.create(
        pageId,
        LINK_DOFOLLOW_ELEMENTS_COUNT,
        linkDofollowElementsCount,
      ),
    );

    await this.pageFactorRepository.saveMany(pageFactors);
  }
}
