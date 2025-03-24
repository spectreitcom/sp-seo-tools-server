import { ICommand } from '@nestjs/cqrs';

export class GoogleAuthenticateCommand implements ICommand {
  constructor(public readonly token: string) {}
}
