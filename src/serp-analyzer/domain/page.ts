export class Page {
  constructor(
    private readonly pageId: string,
    private readonly url: string,
    private readonly position: number,
    private readonly analysisId: string,
    private readonly stages: string[],
    private readonly html: string,
  ) {}

  getPageId() {
    return this.pageId;
  }

  getUrl() {
    return this.url;
  }

  getPosition() {
    return this.position;
  }

  getAnalysisId() {
    return this.analysisId;
  }

  getStages() {
    return this.stages;
  }

  getHtml() {
    return this.html;
  }
}
