import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleAuthenticateCommand } from '../commands/google-authenticate.command';
import { TokenService } from '../ports/token.service';
import { GoogleAuthResponse } from '../types';
import { GoogleAuthenticationService } from '../ports/google-authentication.service';
import { UserRepository } from '../ports/user.repository';
import { UserAuthProvider } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RefreshTokenIdsStorageStorage } from '../ports/refresh-token-ids-storage.storage';

@CommandHandler(GoogleAuthenticateCommand)
export class GoogleAuthenticateCommandHandler
  implements ICommandHandler<GoogleAuthenticateCommand, GoogleAuthResponse>
{
  constructor(
    private readonly tokenService: TokenService,
    private readonly googleAuthenticationService: GoogleAuthenticationService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenIdsStorageStorage: RefreshTokenIdsStorageStorage,
  ) {}

  async execute(
    command: GoogleAuthenticateCommand,
  ): Promise<GoogleAuthResponse> {
    try {
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

        const accessToken = await this.tokenService.sign(
          newUserModel.id,
          email,
        );

        const refreshToken = await this.tokenService.signRefreshToken(
          newUserModel.id,
          email,
          refreshTokenId,
        );

        await this.refreshTokenIdsStorageStorage.insert(
          newUserModel.id,
          refreshTokenId,
        );

        return { accessToken, refreshToken };
      }

      const accessToken = await this.tokenService.sign(userModel.id, email);
      const refreshToken = await this.tokenService.signRefreshToken(
        userModel.id,
        email,
        refreshTokenId,
      );
      await this.refreshTokenIdsStorageStorage.insert(
        userModel.id,
        refreshTokenId,
      );
      return { accessToken, refreshToken };
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
