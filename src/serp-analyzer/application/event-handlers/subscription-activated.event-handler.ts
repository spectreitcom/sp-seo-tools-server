import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionActivatedIntegrationEvent } from '../../../serp-analyzer-subscription/application/integration-events/subscription-activated.integration-event';
import { Logger } from '@nestjs/common';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { UserSubscriptionInfoFactory } from '../../domain/factories/user-subscription-info.factory';

@EventsHandler(SubscriptionActivatedIntegrationEvent)
export class SubscriptionActivatedEventHandler
  implements IEventHandler<SubscriptionActivatedIntegrationEvent>
{
  private readonly logger = new Logger(
    SubscriptionActivatedIntegrationEvent.name,
  );

  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async handle(event: SubscriptionActivatedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));

    const { userId, searchedPages, analysisPerMonth } = event;

    const testingMode = await this.testingModeRepository.findByUser(userId);
    if (testingMode) {
      testingMode.deactivate();
      await this.testingModeRepository.save(testingMode);
    }

    let userSubscription =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (!userSubscription) {
      userSubscription = UserSubscriptionInfoFactory.create(
        userId,
        searchedPages,
        analysisPerMonth,
      );
    }

    userSubscription.activate();
    await this.userSubscriptionInfoRepository.save(userSubscription);
  }
}
