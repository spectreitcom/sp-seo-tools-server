import { IQuery } from '@nestjs/cqrs';

export class GetUserTestingModeInfoQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
