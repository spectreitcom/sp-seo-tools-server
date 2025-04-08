import { Processor, WorkerHost } from '@nestjs/bullmq';
import { STAGE_PROCESSING_QUEUE } from '../constants';
import { Job } from 'bullmq';
import { StageRepository } from '../../../application/ports/stage.repository';
import { HTML_STRUCTURE_STAGE, PAGE_SPEED_STAGE } from '../../stages';
import { ProcessHtmlStructureService } from '../services/process-html-structure.service';
import { ProcessPageSpeedService } from '../services/process-page-speed.service';

@Processor(STAGE_PROCESSING_QUEUE, {
  concurrency: 2,
})
export class StageProcessingConsumer extends WorkerHost {
  constructor(
    private readonly stageRepository: StageRepository,
    private readonly processHtmlStructureService: ProcessHtmlStructureService,
    private readonly processPageSpeedService: ProcessPageSpeedService,
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
    }
  }
}
