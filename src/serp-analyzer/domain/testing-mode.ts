import { ActivateTestingModeError } from './exceptions';
import { ExpiresAt } from './value-objects/expires-at';

export class TestingMode {
  constructor(
    private readonly testingModeId: string,
    private readonly userId: string,
    private active: boolean,
    private readonly searchedPages: number,
    private readonly analysisPerMonth: number,
    private readonly wasActivatedEarlier: boolean,
    private readonly userHasEverBoughtSubscription: boolean,
    private readonly expiresAt: ExpiresAt,
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
