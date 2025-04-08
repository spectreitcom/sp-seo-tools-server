export class PageFactor {
  constructor(
    private readonly pageFactorId: string,
    private pageId: string,
    private factor: string,
    private value: number,
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
