import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionActivatedIntegrationEvent } from '../../../rank-tracker-subscription/application/integration-events/subscription-activated.integration-event';
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
    private readonly eventPublisher: EventPublisher,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async handle(event: SubscriptionActivatedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));

    const { userId, maxKeywordsQty, maxSearchedPages } = event;

    const testingMode = await this.testingModeRepository.findByUserId(userId);
    if (testingMode) {
      this.eventPublisher.mergeObjectContext(testingMode);
      testingMode.deactivate();
      await this.testingModeRepository.save(testingMode);
      testingMode.commit();
    }

    let userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (!userSubscriptionInfo) {
      userSubscriptionInfo = UserSubscriptionInfoFactory.create(
        userId,
        maxKeywordsQty,
        maxSearchedPages,
      );
    }

    this.eventPublisher.mergeObjectContext(userSubscriptionInfo);
    userSubscriptionInfo.activate();
    await this.userSubscriptionInfoRepository.save(userSubscriptionInfo);
    userSubscriptionInfo.commit();
  }
}
