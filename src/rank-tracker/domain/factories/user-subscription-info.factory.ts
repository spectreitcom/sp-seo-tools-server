import { UserSubscriptionInfo } from '../user-subscription-info';
import { randomUUID } from 'crypto';

export class UserSubscriptionInfoFactory {
  static create(
    userId: string,
    maxKeywordsQty: number,
    maxSearchedPages: number,
  ) {
    return new UserSubscriptionInfo(
      randomUUID(),
      userId,
      false,
      maxKeywordsQty,
      maxSearchedPages,
    );
  }
}
