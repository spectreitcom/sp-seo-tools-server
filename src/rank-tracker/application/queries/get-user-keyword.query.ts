import { IQuery } from '@nestjs/cqrs';

export class GetUserKeywordQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly keywordId: string,
  ) {}
}
