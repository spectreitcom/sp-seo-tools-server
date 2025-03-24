import { ICommand } from '@nestjs/cqrs';

export class DeleteDomainCommand implements ICommand {
  constructor(
    public readonly domainId: string,
    public readonly userId: string,
  ) {}
}
