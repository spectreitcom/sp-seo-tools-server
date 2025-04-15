import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ANALYSIS_PROGRESS_QUEUE } from '../constants';
import { AnalysisProgressRepository } from '../../../application/ports/analysis-progress.repository';
import { AnalysisRepository } from '../../../application/ports/analysis.repository';
import { PageRepository } from '../../../application/ports/page.repository';

@Processor(ANALYSIS_PROGRESS_QUEUE)
export class AnalysisProgressConsumer extends WorkerHost {
  constructor(
    private readonly analysisProgressRepository: AnalysisProgressRepository,
    private readonly analysisRepository: AnalysisRepository,
    private readonly pageRepository: PageRepository,
  ) {
    super();
  }

  async process(job: Job<{ pageId: string }>): Promise<void> {
    const pageId = job.data.pageId;
    const page = await this.pageRepository.findById(pageId);
    const analysis = await this.analysisRepository.findById(
      page.getAnalysisId(),
    );
    const analysisProgress =
      await this.analysisProgressRepository.findByAnalysis(
        analysis.getAnalysisId(),
      );
    analysisProgress.increment();

    await this.analysisProgressRepository.save(analysisProgress);
  }
}
