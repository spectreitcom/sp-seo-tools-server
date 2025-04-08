export class Page {
  constructor(
    private readonly pageId: string,
    private url: string,
    private position: number,
    private analysisId: string,
    private stages: string[],
    private html: string,
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
