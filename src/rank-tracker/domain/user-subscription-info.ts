export class UserSubscriptionInfo {
  constructor(
    public readonly userSubscriptionInfoId: string,
    public readonly userId: string,
    public readonly active: boolean,
    public readonly maxKeywordsQty: number,
    public readonly maxSearchedPages: number,
  ) {}
}
