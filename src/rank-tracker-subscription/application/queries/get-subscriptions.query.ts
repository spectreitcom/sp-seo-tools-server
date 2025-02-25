import { IQuery } from '@nestjs/cqrs';

export class GetSubscriptionsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
