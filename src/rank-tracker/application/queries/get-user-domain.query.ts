import { IQuery } from '@nestjs/cqrs';

export class GetUserDomainQuery implements IQuery {
  constructor(
    public readonly domainId: string,
    public readonly userId: string,
  ) {}
}
