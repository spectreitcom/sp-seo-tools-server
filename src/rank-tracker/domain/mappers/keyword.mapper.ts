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
    let maxKeywordsQty = 0;

    if (rtTestingMode && rtTestingMode.active) {
      maxKeywordsQty = rtTestingMode.maxKeywordsQty;
    }

    if (rtUserSubscriptionInfo && rtUserSubscriptionInfo.active) {
      maxKeywordsQty = rtUserSubscriptionInfo.maxKeywordsQty;
    }

    const keywordId = rtKeyword.id;
    const activeSub = rtUserSubscriptionInfo
      ? rtUserSubscriptionInfo.active
      : false;
    const availableKeywordQuantity = new AvailableKeywordsQuantity(
      usedKeywordsQty,
      maxKeywordsQty,
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
