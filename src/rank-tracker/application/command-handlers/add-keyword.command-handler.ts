import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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

@CommandHandler(AddKeywordCommand)
export class AddKeywordCommandHandler
  implements ICommandHandler<AddKeywordCommand, void>
{
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly testingModeRepository: TestingModeRepository,
  ) {}

  async execute(command: AddKeywordCommand): Promise<void> {
    const { text, domainId, userId, searchEngineId, device, localizationId } =
      command;

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    const testingMode = await this.testingModeRepository.findByUserId(userId);

    const usedKeywordsQty =
      await this.keywordRepository.getUsedKeywordsQty(userId);

    let maxKeywordsQty = 0;

    if (testingMode && testingMode.getActive()) {
      maxKeywordsQty = testingMode.getMaxKeywordsQty();
    } else if (userSubscriptionInfo) {
      maxKeywordsQty = userSubscriptionInfo.maxKeywordsQty;
    }

    try {
      const keyword = KeywordFactory.create(
        userSubscriptionInfo ? userSubscriptionInfo.active : false,
        usedKeywordsQty,
        maxKeywordsQty,
        domainId,
        text,
        searchEngineId,
        device,
        localizationId,
        testingMode ? testingMode.getActive() : false,
      );

      keyword.create();

      await this.keywordRepository.save(keyword);

      keyword.commit();
    } catch (e) {
      if (e instanceof InactiveSubscriptionError) {
        throw new BadRequestException();
      }
      if (e instanceof IsKeywordsQuantityExceededError) {
        throw new BadRequestException();
      }

      throw new InternalServerErrorException();
    }
  }
}
