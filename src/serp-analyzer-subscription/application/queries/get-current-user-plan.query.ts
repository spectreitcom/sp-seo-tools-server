import { IQuery } from '@nestjs/cqrs';

export class GetCurrentUserPlanQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
