export class Subscription {
  constructor(
    private readonly subscriptionId: string,
    private readonly name: string,
    private readonly amount: number,
    private readonly searchedPages: number,
    private readonly analysisPerMonth: number,
    private readonly priceId: string,
  ) {}

  getSubscriptionId() {
    return this.subscriptionId;
  }

  getName() {
    return this.name;
  }

  getAmount() {
    return this.amount;
  }

  getSearchedPages() {
    return this.searchedPages;
  }

  getAnalysisPerMonth() {
    return this.analysisPerMonth;
  }

  getPriceId() {
    return this.priceId;
  }
}
