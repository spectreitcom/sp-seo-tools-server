import { IQuery } from '@nestjs/cqrs';

export class GetAllSearchEnginesQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
