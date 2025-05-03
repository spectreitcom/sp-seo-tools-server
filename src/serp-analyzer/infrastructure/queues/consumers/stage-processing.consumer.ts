import { Processor, WorkerHost } from '@nestjs/bullmq';
import { STAGE_PROCESSING_QUEUE } from '../constants';
import { Job } from 'bullmq';
import { StageRepository } from '../../../application/ports/stage.repository';
import { HTML_STRUCTURE_STAGE, PAGE_SPEED_STAGE } from '../../stages';
import { ProcessHtmlStructureService } from '../services/process-html-structure.service';
import { ProcessPageSpeedService } from '../services/process-page-speed.service';
import { AnalysisRepository } from '../../../application/ports/analysis.repository';
import { PageRepository } from '../../../application/ports/page.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { Stage } from '../../../domain/stage';

@Processor(STAGE_PROCESSING_QUEUE, {
  concurrency: 2,
})
export class StageProcessingConsumer extends WorkerHost {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly processHtmlStructureService: ProcessHtmlStructureService,
    private readonly processPageSpeedService: ProcessPageSpeedService,
    private readonly analysisRepository: AnalysisRepository,
    private readonly pageRepository: PageRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const stageId = job.data.stageId;
    const stage = await this.stageRepository.findById(stageId);

    if (!stage) return;

    switch (stage.getStage()) {
      case HTML_STRUCTURE_STAGE:
        await this.processHtmlStructureService.process(stage);
        break;
      case PAGE_SPEED_STAGE:
        await this.processPageSpeedService.process(stage);
        break;
      default:
        await this.handleDefault(stage);
        break;
    }
  }

  private async handleDefault(stage: Stage) {
    const page = await this.pageRepository.findById(stage.getPageId());
    if (!page) return;
    const analysis = await this.analysisRepository.findById(
      page.getAnalysisId(),
    );
    this.eventPublisher.mergeObjectContext(analysis);
    analysis.markAsError();
    await this.analysisRepository.save(analysis);
    analysis.commit();
  }
}
