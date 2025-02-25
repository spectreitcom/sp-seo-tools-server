export class SubscriptionListItemDto {
  constructor(
    public readonly subscriptionId: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly maxKeywordsQty: number,
    public readonly maxSearchedPages: number,
  ) {}
}
