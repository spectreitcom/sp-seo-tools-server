import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GoogleAuthenticateCommand } from '../commands/google-authenticate.command';
import { GoogleAuthResponse } from '../types';
import { AuthenticateByGoogleDto } from '../dto/authenticate-by-google.dto';
import { GetCurrentUserQuery } from '../queries/get-current-user.query';
import { GetCurrentUserQueryResponse } from '../query-handlers/get-current-user.query-handler';
import { RefreshTokenCommand } from '../commands/refresh-token.command';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async authenticateByGoogle(payload: AuthenticateByGoogleDto) {
    return this.commandBus.execute<
      GoogleAuthenticateCommand,
      GoogleAuthResponse
    >(new GoogleAuthenticateCommand(payload.token));
  }

  async getCurrentUser(userId: string) {
    return this.queryBus.execute<
      GetCurrentUserQuery,
      GetCurrentUserQueryResponse
    >(new GetCurrentUserQuery(userId));
  }

  async refreshToken(token: string) {
    return this.commandBus.execute<RefreshTokenCommand, GoogleAuthResponse>(
      new RefreshTokenCommand(token),
    );
  }
}
