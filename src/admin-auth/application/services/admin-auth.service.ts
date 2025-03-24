import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthenticateCommand } from '../commands/authenticate.command';
import { CommandResponse } from '../command-handlers/authenticate.command-handler';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class AdminAuthService {
  constructor(private readonly commandBus: CommandBus) {}

  signIn(payload: SignInDto) {
    return this.commandBus.execute<AuthenticateCommand, CommandResponse>(
      new AuthenticateCommand(payload.email, payload.password),
    );
  }
}
