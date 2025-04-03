import { ActivateTestingModeError } from './exceptions';
import { ExpiresAt } from './value-objects/expires-at';

export class TestingMode {
  constructor(
    private testingModeId: string,
    private userId: string,
    private active: boolean,
    private searchedPages: number,
    private analysisPerMonth: number,
    private wasActivatedEarlier: boolean,
    private userHasEverBoughtSubscription: boolean,
    private expiresAt: ExpiresAt,
  ) {}

  activate() {
    const canActivate =
      !this.userHasEverBoughtSubscription && !this.wasActivatedEarlier;

    if (!canActivate) {
      throw new ActivateTestingModeError();
    }

    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  getTestingModeId() {
    return this.testingModeId;
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

  getExpiresAt() {
    return this.expiresAt;
  }
}
