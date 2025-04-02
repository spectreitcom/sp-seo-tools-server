import { ICommand } from '@nestjs/cqrs';

export class CreateSessionPortalCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
