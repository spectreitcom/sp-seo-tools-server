export class UserSubscriptionInfo {
  constructor(
    private readonly userSubscriptionInfoId: string,
    private readonly userId: string,
    private active: boolean,
    private readonly searchedPages: number,
    private readonly analysisPerMonth: number,
  ) {}

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  getUserSubscriptionInfoId() {
    return this.userSubscriptionInfoId;
  }

  getUserId() {
    return this.userId;
  }

  getActive() {
    return this.active;
  }

  getSearchedPages() {
    return this.searchedPages;
  }

  getAnalysisPerMonth() {
    return this.analysisPerMonth;
  }
}
