import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivateTestingModeCommand } from '../commands/activate-testing-mode.command';
import { TestingModeFactory } from '../../domain/factories/testing-mode.factory';
import * as moment from 'moment';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@CommandHandler(ActivateTestingModeCommand)
export class ActivateTestingModeCommandHandler
  implements ICommandHandler<ActivateTestingModeCommand, void>
{
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(command: ActivateTestingModeCommand): Promise<void> {
    const { userId } = command;

    const existingTestingMode =
      await this.testingModeRepository.findByUser(userId);

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    const expiresAt = moment().add(7, 'days').unix();
    const testingMode = TestingModeFactory.create(
      userId,
      1,
      5,
      !!existingTestingMode,
      !!userSubscriptionInfo,
      expiresAt,
    );

    testingMode.activate();
    await this.testingModeRepository.save(testingMode);
  }
}
