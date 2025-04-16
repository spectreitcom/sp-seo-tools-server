export class PageFactor {
  constructor(
    private readonly pageFactorId: string,
    private readonly pageId: string,
    private readonly factor: string,
    private readonly value: number,
  ) {}

  getPageFactorId() {
    return this.pageFactorId;
  }

  getPageId() {
    return this.pageId;
  }

  getFactor() {
    return this.factor;
  }

  getValue() {
    return this.value;
  }
}
