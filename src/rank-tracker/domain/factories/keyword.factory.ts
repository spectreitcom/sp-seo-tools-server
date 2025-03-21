import { Keyword } from '../keyword';
import { randomUUID } from 'crypto';
import { AvailableKeywordsQuantity } from '../value-objects/available-keywords-quantity';
import { Device } from '../value-objects/device';
import * as moment from 'moment';

export class KeywordFactory {
  static create(
    activeSub: boolean,
    usedKeywordsQty: number,
    maxKeywordsQty: number,
    domainId: string,
    text: string,
    device: string,
    localizationId: string,
    testingModeActive: boolean,
  ) {
    const availableKeywordsQty = new AvailableKeywordsQuantity(
      usedKeywordsQty,
      maxKeywordsQty,
    );
    return new Keyword(
      activeSub,
      availableKeywordsQty,
      randomUUID(),
      domainId,
      text,
      new Device(device),
      localizationId,
      testingModeActive,
      moment().unix(),
      'NO_CHANGE',
    );
  }
}
