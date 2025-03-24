import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ActivateTestingModeCommand } from '../commands/activate-testing-mode.command';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { TestingModeFactory } from '../../domain/factories/testing-mode.factory';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import * as moment from 'moment';

@CommandHandler(ActivateTestingModeCommand)
export class ActivateTestingModeCommandHandler
  implements ICommandHandler<ActivateTestingModeCommand, void>
{
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ActivateTestingModeCommand): Promise<void> {
    const { userId } = command;

    const wasActivatedEarlier =
      await this.testingModeRepository.hasUserAlreadyActivated(userId);

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    const expiresAt = moment().add(7, 'days').unix();

    const testingMode = TestingModeFactory.create(
      userId,
      wasActivatedEarlier,
      !!userSubscriptionInfo,
      expiresAt,
      5,
      1,
    );

    testingMode.activate();

    this.eventPublisher.mergeObjectContext(testingMode);
    await this.testingModeRepository.save(testingMode);

    testingMode.commit();
  }
}
