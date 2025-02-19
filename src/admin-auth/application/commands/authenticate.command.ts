import { ICommand } from '@nestjs/cqrs';

export class AuthenticateCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
