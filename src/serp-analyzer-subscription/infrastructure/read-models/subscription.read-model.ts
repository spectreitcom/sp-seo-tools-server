export class SubscriptionReadModel {
  constructor(
    public readonly subscriptionId: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly searchedPages: number,
    public readonly analysisPerMonth: number,
  ) {}
}
