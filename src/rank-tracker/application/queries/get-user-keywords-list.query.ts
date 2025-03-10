import { IQuery } from '@nestjs/cqrs';

export class GetUserKeywordsListQuery implements IQuery {
  constructor(
    public readonly searchText: string | null | undefined,
    public readonly localizationId: string | null | undefined,
    public readonly device: string | null | undefined,
    public readonly domainId: string | null | undefined,
    public readonly userId: string,
    public readonly page: number,
  ) {}
}
