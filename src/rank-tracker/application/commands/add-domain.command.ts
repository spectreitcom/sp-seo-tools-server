import { ICommand } from '@nestjs/cqrs';

export class AddDomainCommand implements ICommand {
  constructor(
    public readonly text: string,
    public readonly userId: string,
  ) {}
}
