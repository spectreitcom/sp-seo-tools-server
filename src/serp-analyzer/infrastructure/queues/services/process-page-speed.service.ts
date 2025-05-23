import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { StageProcessingFinishedEvent } from '../../events/stage-processing-finished.event';
import { Stage } from '../../../domain/stage';
import { PageSpeedFacade } from '../../../../page-speed/application/page-speed.facade';
import { PageFactor } from '../../../domain/page-factor';
import { PageFactorRepository } from '../../../application/ports/page-factor.repository';
import { PageFactorFactory } from '../../../domain/factories/page-factor.factory';
import {
  PAGE_SPEED_DOCUMENT_SIZE,
  PAGE_SPEED_FCP,
  PAGE_SPEED_LCP,
  PAGE_SPEED_TTFB,
  PAGE_SPEED_TTI,
} from '../../factors';
import { StageCheckerService } from './stage-checker.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

@Injectable()
export class ProcessPageSpeedService {
  constructor(
    private readonly eventBus: EventBus,
    private readonly pageSpeedFacade: PageSpeedFacade,
    private readonly pageFactorRepository: PageFactorRepository,
    private readonly stageCheckerService: StageCheckerService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async process(stage: Stage): Promise<void> {
    try {
      const { page } = await this.stageCheckerService.checkStage(stage);

      const { fcp, lcp, ttfb, documentSize, tti } =
        await this.pageSpeedFacade.processPage(page.getUrl());

      const pageFactors: PageFactor[] = [];

      pageFactors.push(
        PageFactorFactory.create(page.getPageId(), PAGE_SPEED_FCP, fcp),
      );

      pageFactors.push(
        PageFactorFactory.create(page.getPageId(), PAGE_SPEED_LCP, lcp),
      );

      pageFactors.push(
        PageFactorFactory.create(page.getPageId(), PAGE_SPEED_TTFB, ttfb),
      );

      pageFactors.push(
        PageFactorFactory.create(page.getPageId(), PAGE_SPEED_TTI, tti),
      );

      pageFactors.push(
        PageFactorFactory.create(
          page.getPageId(),
          PAGE_SPEED_DOCUMENT_SIZE,
          documentSize,
        ),
      );

      await this.pageFactorRepository.saveMany(pageFactors);

      this.eventBus.publish(
        new StageProcessingFinishedEvent(stage.getStageId()),
      );
    } catch (e) {
      this.errorHandlerService.logError(e, 'ProcessPageSpeedService.process');
      this.eventBus.publish(
        new StageProcessingFinishedEvent(stage.getStageId()),
      );
    }
  }
}
