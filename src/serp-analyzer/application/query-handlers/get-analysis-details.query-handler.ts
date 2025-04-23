import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnalysisDetailsQuery } from '../queries/get-analysis-details.query';
import { NotFoundException } from '@nestjs/common';
import { UserAnalysisRepository } from '../ports/user-analysis.repository';
import { PageRepository } from '../ports/page.repository';
import { PageFactorRepository } from '../ports/page-factor.repository';
import {
  factorsCollection,
  FactorsCollection,
} from '../../infrastructure/factors-collection';

type PageData = {
  pageId: string;
  url: string;
  position: number;
  factors: Record<string, number>;
};

export type GetAnalysisDetailsQueryResponse = {
  analysisId: string;
  phrase: string;
  localizationName: string;
  localizationCountryCode: string;
  deviceName: string;
  pages: PageData[];
  factorsCollection: FactorsCollection;
};

@QueryHandler(GetAnalysisDetailsQuery)
export class GetAnalysisDetailsQueryHandler
  implements
    IQueryHandler<GetAnalysisDetailsQuery, GetAnalysisDetailsQueryResponse>
{
  constructor(
    private readonly userAnalysisRepository: UserAnalysisRepository,
    private readonly pageRepository: PageRepository,
    private readonly pageFactorRepository: PageFactorRepository,
  ) {}

  async execute(
    query: GetAnalysisDetailsQuery,
  ): Promise<GetAnalysisDetailsQueryResponse> {
    const { userId, analysisId } = query;

    const userAnalysis = await this.userAnalysisRepository.findByIdAndUser(
      analysisId,
      userId,
    );

    if (!userAnalysis) throw new NotFoundException();

    const pages = await this.pageRepository.findAllByAnalysis(analysisId);

    const pagesData: PageData[] = [];

    for (const page of pages) {
      const pageFactors = await this.pageFactorRepository.findByPage(
        page.getPageId(),
      );

      const factors: Record<string, number> = {};

      for (const pageFactor of pageFactors) {
        factors[pageFactor.getFactor()] = pageFactor.getValue();
      }

      pagesData.push({
        pageId: page.getPageId(),
        url: page.getUrl(),
        position: page.getPosition(),
        factors,
      });
    }

    return {
      analysisId: userAnalysis.analysisId,
      phrase: userAnalysis.phrase,
      deviceName: userAnalysis.deviceName,
      localizationCountryCode: userAnalysis.localizationCountryCode,
      localizationName: userAnalysis.localizationName,
      pages: pagesData,
      factorsCollection,
    };
  }
}
