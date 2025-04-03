import { UserSubscriptionInfo } from '../user-subscription-info';
import { randomUUID } from 'crypto';

export class UserSubscriptionInfoFactory {
  static create(
    userId: string,
    searchedPages: number,
    analysisPerMonth: number,
    active = false,
  ) {
    return new UserSubscriptionInfo(
      randomUUID(),
      userId,
      active,
      searchedPages,
      analysisPerMonth,
    );
  }
}
