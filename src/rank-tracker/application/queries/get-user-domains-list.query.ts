import { IQuery } from '@nestjs/cqrs';

export class GetUserDomainsListQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly searchText: string | null | undefined,
    public readonly userId: string,
    public readonly take: number,
  ) {}
}
