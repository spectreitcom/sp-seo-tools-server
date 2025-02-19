export class UserDomainsListItemDto {
  constructor(
    public readonly domainId: string,
    public readonly domain: string,
    public readonly keywordsCount: number,
  ) {}
}
