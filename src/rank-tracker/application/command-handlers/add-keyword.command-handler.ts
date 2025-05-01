import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddKeywordCommand } from '../commands/add-keyword.command';
import { KeywordRepository } from '../ports/keyword.repository';
import {
  InactiveSubscriptionError,
  IsKeywordsQuantityExceededError,
} from '../../domain/exceptions';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
import { KeywordFactory } from '../../domain/factories/keyword.factory';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@CommandHandler(AddKeywordCommand)
export class AddKeywordCommandHandler
  implements ICommandHandler<AddKeywordCommand, void>
{
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async execute(command: AddKeywordCommand): Promise<void> {
    const { text, domainId, userId, device, localizationId } = command;

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    const testingMode = await this.testingModeRepository.findByUserId(userId);

    const usedKeywordsQty =
      await this.keywordRepository.getUsedKeywordsQty(userId);

    let maxKeywordsQty = 0;

    if (testingMode?.getActive()) {
      maxKeywordsQty = testingMode.getMaxKeywordsQty();
    } else if (userSubscriptionInfo) {
      maxKeywordsQty = userSubscriptionInfo.getMaxKeywordsQty();
    }

    try {
      const keyword = KeywordFactory.create(
        userSubscriptionInfo ? userSubscriptionInfo.getActive() : false,
        usedKeywordsQty,
        maxKeywordsQty,
        domainId,
        text,
        device,
        localizationId,
        testingMode ? testingMode.getActive() : false,
      );
      this.eventPublisher.mergeObjectContext(keyword);
      keyword.create();
      await this.keywordRepository.save(keyword);
      keyword.commit();
    } catch (e) {
      this.errorHandlerService.logError(e, 'AddKeywordCommandHandler.execute');

      if (e instanceof InactiveSubscriptionError) {
        throw new BadRequestException('Subscription is inactive');
      }
      if (e instanceof IsKeywordsQuantityExceededError) {
        throw new BadRequestException('Keywords quantity exceeded');
      }

      throw new InternalServerErrorException();
    }
  }
}
