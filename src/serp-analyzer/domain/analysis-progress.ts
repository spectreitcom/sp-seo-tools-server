export class AnalysisProgress {
  constructor(
    private readonly analysisProgressId: string,
    private readonly analysisId: string,
    private current: number,
    private total: number,
  ) {}

  updateTotalProgress(total: number) {
    this.total = total;
  }

  increment() {
    this.current = this.current + 1;
  }

  getAnalysisProgressId() {
    return this.analysisProgressId;
  }

  getAnalysisId() {
    return this.analysisId;
  }

  getCurrent() {
    return this.current;
  }

  getTotal() {
    return this.total;
  }
}
