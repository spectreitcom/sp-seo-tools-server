export class Subscription {
  constructor(
    private subscriptionId: string,
    private name: string,
    private amount: number,
    private searchedPages: number,
    private analysisPerMonth: number,
    private priceId: string,
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
