import { IQuery } from '@nestjs/cqrs';

export class GetCurrentPlanQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
