import { IQuery } from '@nestjs/cqrs';

export class GetAvailableKeywordsQuantityQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
