import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleAuthenticateCommand } from '../commands/google-authenticate.command';
import { GoogleAuthResponse } from '../types';
import { GoogleAuthenticationService } from '../ports/google-authentication.service';
import { UserRepository } from '../ports/user.repository';
import { UserAuthProvider } from '@prisma/client';
import { randomUUID } from 'crypto';
import { TokenHelperService } from '../ports/token-helper.service';

@CommandHandler(GoogleAuthenticateCommand)
export class GoogleAuthenticateCommandHandler
  implements ICommandHandler<GoogleAuthenticateCommand, GoogleAuthResponse>
{
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
    private readonly userRepository: UserRepository,
    private readonly tokenHelperService: TokenHelperService,
  ) {}

  async execute(
    command: GoogleAuthenticateCommand,
  ): Promise<GoogleAuthResponse> {
    const { token } = command;

    const { email, googleId, picture } =
      await this.googleAuthenticationService.authenticate(token);

    const userModel = await this.userRepository.findByGoogleId(googleId);

    const refreshTokenId = randomUUID();

    if (!userModel) {
      const newUserModel = await this.userRepository.create(
        email,
        UserAuthProvider.GOOGLE,
        googleId,
        null,
        picture,
      );

      const [accessToken, refreshToken] =
        await this.tokenHelperService.getTokens(
          newUserModel.id,
          email,
          refreshTokenId,
        );

      return { accessToken, refreshToken };
    }

    const [accessToken, refreshToken] = await this.tokenHelperService.getTokens(
      userModel.id,
      email,
      refreshTokenId,
    );

    return { accessToken, refreshToken };
  }
}
