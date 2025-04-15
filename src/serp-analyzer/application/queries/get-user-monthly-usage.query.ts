import { IQuery } from '@nestjs/cqrs';

export class GetUserMonthlyUsageQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
