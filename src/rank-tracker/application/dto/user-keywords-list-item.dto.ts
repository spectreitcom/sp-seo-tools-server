export class UserKeywordsListItemDto {
  constructor(
    public readonly keywordId: string,
    public readonly keywordText: string,
    public readonly lastIndexedPosition: number,
    public readonly localizationCountryCode: string,
    public readonly searchEngineName: string,
    public readonly device: string,
    public readonly domain: string,
    public readonly localizationCountryName: string,
    public readonly deviceName: string,
  ) {}
}
