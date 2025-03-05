import { IQuery } from '@nestjs/cqrs';

export class GetAllAvailableForUserSearchEnginesQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
