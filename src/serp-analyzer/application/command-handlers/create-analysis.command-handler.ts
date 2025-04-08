import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAnalysisCommand } from '../commands/create-analysis.command';
import { AnalysisRepository } from '../ports/analysis.repository';
import { AnalysisFactory } from '../../domain/factories/analysis.factory';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@CommandHandler(CreateAnalysisCommand)
export class CreateAnalysisCommandHandler
  implements ICommandHandler<CreateAnalysisCommand, void>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly analysisRepository: AnalysisRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(command: CreateAnalysisCommand): Promise<void> {
    const { keyword, userId, localizationId, device } = command;

    const testingMode = await this.testingModeRepository.findByUser(userId);
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);
    const exceededMonthlyLimit =
      await this.analysisRepository.exceededMonthlyLimit(userId);

    const hasActiveTestingMode = testingMode ? testingMode.getActive() : false;
    const hasActiveSubscription = userSubscriptionInfo
      ? userSubscriptionInfo.getActive()
      : false;

    const analysis = AnalysisFactory.create(
      keyword,
      localizationId,
      device,
      userId,
      hasActiveTestingMode,
      hasActiveSubscription,
      exceededMonthlyLimit,
    );
    analysis.create();
    this.eventPublisher.mergeObjectContext(analysis);
    await this.analysisRepository.save(analysis);
    analysis.commit();
  }
}
