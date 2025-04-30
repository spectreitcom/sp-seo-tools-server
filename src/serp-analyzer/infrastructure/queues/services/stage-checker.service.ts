import { Injectable } from '@nestjs/common';
import { Stage } from '../../../domain/stage';
import { StageRepository } from '../../../application/ports/stage.repository';
import { PageRepository } from '../../../application/ports/page.repository';
import { AnalysisRepository } from '../../../application/ports/analysis.repository';

@Injectable()
export class StageCheckerService {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly pageRepository: PageRepository,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async checkStage(stage: Stage) {
    stage.makeInProgress();
    await this.stageRepository.save(stage);

    const page = await this.pageRepository.findByStageId(stage.getStageId());

    if (!page) {
      throw new Error('Analysis has errors, cannot process stage');
    }

    const analysis = await this.analysisRepository.findById(
      page.getAnalysisId(),
    );

    const hasAnalysisErrors = await this.analysisRepository.hasAnalysisErrors(
      analysis.getAnalysisId(),
    );

    if (hasAnalysisErrors) {
      throw new Error('Analysis has errors, cannot process stage');
    }

    return {
      page,
      analysis,
    };
  }
}
