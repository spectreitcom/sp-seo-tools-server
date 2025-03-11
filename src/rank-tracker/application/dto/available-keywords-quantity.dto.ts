export class AvailableKeywordsQuantityDto {
  constructor(
    public readonly maxKeywordsQuantity: number,
    public readonly usedKeywordsQuantity: number,
    public readonly exceeded: boolean,
  ) {}
}
