import { Injectable } from '@nestjs/common';
import { StageProcessingFinishedEvent } from '../../events/stage-processing-finished.event';
import { EventBus } from '@nestjs/cqrs';
import { Stage } from '../../../domain/stage';
import { ProcessH1Service } from './processH1.service';
import { ProcessH2Service } from './processH2.service';
import { ProcessH3Service } from './processH3.service';
import { ProcessH4Service } from './processH4.service';
import { ProcessH5Service } from './processH5.service';
import { ProcessH6Service } from './processH6.service';
import { ProcessPService } from './processP.service';
import { ProcessStrongService } from './processStrong.service';
import { ProcessImgAltService } from './processImgAlt.service';
import { ProcessTitleService } from './processTitle.service';
import { ProcessMetaDescService } from './processMetaDesc.service';
import { ProcessLinkService } from './processLink.service';
import { ProcessBodyService } from './processBody.service';
import { ProcessImageService } from './processImage.service';
import { StageRepository } from '../../../application/ports/stage.repository';
import { StageCheckerService } from './stage-checker.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

@Injectable()
export class ProcessHtmlStructureService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly processH1Service: ProcessH1Service,
    private readonly processH2Service: ProcessH2Service,
    private readonly processH3Service: ProcessH3Service,
    private readonly processH4Service: ProcessH4Service,
    private readonly processH5Service: ProcessH5Service,
    private readonly processH6Service: ProcessH6Service,
    private readonly processPService: ProcessPService,
    private readonly processStrongService: ProcessStrongService,
    private readonly processImgAltService: ProcessImgAltService,
    private readonly processTitleService: ProcessTitleService,
    private readonly processMetaDescService: ProcessMetaDescService,
    private readonly processLinkService: ProcessLinkService,
    private readonly processBodyService: ProcessBodyService,
    private readonly processImageService: ProcessImageService,
    private readonly stageRepository: StageRepository,
    private readonly stageCheckerService: StageCheckerService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async process(stage: Stage): Promise<void> {
    try {
      const { page, analysis } =
        await this.stageCheckerService.checkStage(stage);

      const html = page.getHtml();
      const phrase = analysis.getKeyword();

      await this.processH1Service.process(html, phrase, page.getPageId());
      await this.processH2Service.process(html, phrase, page.getPageId());
      await this.processH3Service.process(html, phrase, page.getPageId());
      await this.processH4Service.process(html, phrase, page.getPageId());
      await this.processH5Service.process(html, phrase, page.getPageId());
      await this.processH6Service.process(html, phrase, page.getPageId());
      await this.processPService.process(html, phrase, page.getPageId());
      await this.processStrongService.process(html, phrase, page.getPageId());
      await this.processImgAltService.process(html, phrase, page.getPageId());
      await this.processTitleService.process(html, phrase, page.getPageId());
      await this.processMetaDescService.process(html, phrase, page.getPageId());
      await this.processLinkService.process(html, page.getPageId());
      await this.processBodyService.process(html, phrase, page.getPageId());
      await this.processImageService.process(html, page.getPageId());
      this.eventBus.publish(
        new StageProcessingFinishedEvent(stage.getStageId()),
      );
    } catch (e) {
      this.errorHandlerService.logError(
        e,
        'ProcessHtmlStructureService.process',
      );
      this.eventBus.publish(
        new StageProcessingFinishedEvent(stage.getStageId()),
      );
    }
  }
}
