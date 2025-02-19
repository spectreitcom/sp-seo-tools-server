import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GoogleAuthenticateCommand } from '../commands/google-authenticate.command';
import { CommandResponse } from '../types';
import { AuthenticateByGoogleDto } from '../dto/authenticate-by-google.dto';
import { GetCurrentUserQuery } from '../queries/get-current-user.query';
import { GetCurrentUserQueryResponse } from '../query-handlers/get-current-user.query-handler';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async authenticateByGoogle(payload: AuthenticateByGoogleDto) {
    return this.commandBus.execute<GoogleAuthenticateCommand, CommandResponse>(
      new GoogleAuthenticateCommand(payload.token),
    );
  }

  async getCurrentUser(userId: string) {
    return this.queryBus.execute<
      GetCurrentUserQuery,
      GetCurrentUserQueryResponse
    >(new GetCurrentUserQuery(userId));
  }
}
