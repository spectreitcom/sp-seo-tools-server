export class UserSubscriptionInfo {
  constructor(
    private userSubscriptionInfoId: string,
    private userId: string,
    private active: boolean,
    private searchedPages: number,
    private analysisPerMonth: number,
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
