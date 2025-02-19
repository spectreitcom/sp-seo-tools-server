export class AvailableKeywordsQuantity {
  constructor(
    private readonly usedKeywordsQuantity: number,
    private readonly maxKeywordsQuantity: number,
  ) {}

  isExceeded() {
    return this.usedKeywordsQuantity >= this.maxKeywordsQuantity;
  }
}
