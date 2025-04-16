export class AnalysisProgress {
  constructor(
    private readonly analysisProgressId: string,
    private readonly analysisId: string,
    private current: number,
    private readonly total: number,
  ) {}

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
