import { IQuery } from '@nestjs/cqrs';

export class GetDomainPositionHistoryQuery implements IQuery {
  constructor(
    public readonly keywordId: string,
    public readonly userId: string,
    public readonly fromDate: string | null | undefined,
    public readonly toDate: string | null | undefined,
    public readonly page: number,
    public readonly take: number,
  ) {}
}
