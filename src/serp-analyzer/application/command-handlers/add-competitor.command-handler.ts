import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddCompetitorCommand } from '../commands/add-competitor.command';
import { HtmlService } from '../ports/html.service';
import { PageFactory } from '../../domain/factories/page-factory';
import { stagesArray } from '../../infrastructure/stages';
import { PageRepository } from '../ports/page.repository';
import { AnalysisRepository } from '../ports/analysis.repository';
import { BadRequestException } from '@nestjs/common';
import { StageProcessingQueueService } from '../ports/stage-processing-queue.service';

@CommandHandler(AddCompetitorCommand)
export class AddCompetitorCommandHandler
  implements ICommandHandler<AddCompetitorCommand, void>
{
  constructor(
    private readonly htmlService: HtmlService,
    private readonly pageRepository: PageRepository,
    private readonly analysisRepository: AnalysisRepository,
    private readonly stageProcessingQueueService: StageProcessingQueueService,
  ) {}

  async execute(command: AddCompetitorCommand): Promise<void> {
    const { userId, url, analysisId } = command;

    await this.checkAnalysis(analysisId, userId);

    const { html, status } = await this.htmlService.fromUrl(url);
    const page = PageFactory.create(url, 0, analysisId, stagesArray, html);

    if (status >= 400) {
      page.setError(`Failed to fetch HTML`);
    }

    await this.pageRepository.save(page);

    await this.stageProcessingQueueService.beginProcessing([page.getPageId()]);
  }

  private async checkAnalysis(analysisId: string, userId: string) {
    const analysis = await this.analysisRepository.findById(analysisId);

    if (!analysis) {
      throw new BadRequestException("Analysis doesn't exist");
    }

    if (analysis.getUserId() !== userId) {
      throw new BadRequestException("User doesn't own this analysis");
    }
  }
}
