import {
  RtKeyword,
  RtUserSubscriptionInfo,
  RtTestingMode,
} from '@prisma/client';
import { Keyword } from '../keyword';
import { AvailableKeywordsQuantity } from '../value-objects/available-keywords-quantity';
import { Device } from '../value-objects/device';

export class KeywordMapper {
  static toDomain(
    rtKeyword: RtKeyword,
    rtUserSubscriptionInfo: RtUserSubscriptionInfo,
    usedKeywordsQty: number,
    rtTestingMode: RtTestingMode,
  ) {
    const keywordId = rtKeyword.id;
    const activeSub = rtUserSubscriptionInfo.active;
    const availableKeywordQuantity = new AvailableKeywordsQuantity(
      usedKeywordsQty,
      rtUserSubscriptionInfo.maxKeywordsQty,
    );
    const domainId = rtKeyword.domainId;
    const keywordText = rtKeyword.text;
    const device = new Device(rtKeyword.device);
    const localizationId = rtKeyword.localizationId;
    const testingModeActive = rtTestingMode ? rtTestingMode.active : false;

    return new Keyword(
      activeSub,
      availableKeywordQuantity,
      keywordId,
      domainId,
      keywordText,
      device,
      localizationId,
      testingModeActive,
      rtKeyword.timestamp,
    );
  }
}
