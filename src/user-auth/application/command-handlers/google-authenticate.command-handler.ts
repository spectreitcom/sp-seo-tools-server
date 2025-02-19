import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleAuthenticateCommand } from '../commands/google-authenticate.command';
import { TokenService } from '../ports/token.service';
import { CommandResponse } from '../types';
import { GoogleAuthenticationService } from '../ports/google-authentication.service';
import { UserRepository } from '../ports/user.repository';
import { UserAuthProvider } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(GoogleAuthenticateCommand)
export class GoogleAuthenticateCommandHandler
  implements ICommandHandler<GoogleAuthenticateCommand, CommandResponse>
{
  constructor(
    private readonly tokenService: TokenService,
    private readonly googleAuthenticationService: GoogleAuthenticationService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: GoogleAuthenticateCommand): Promise<CommandResponse> {
    try {
      const { token } = command;

      const { email, googleId } =
        await this.googleAuthenticationService.authenticate(token);

      const userModel = await this.userRepository.findByGoogleId(googleId);

      if (!userModel) {
        const newUserModel = await this.userRepository.create(
          email,
          UserAuthProvider.GOOGLE,
          googleId,
        );

        const accessToken = await this.tokenService.sign(
          newUserModel.id,
          email,
        );
        return { accessToken };
      }

      const accessToken = await this.tokenService.sign(userModel.id, email);
      return { accessToken };
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
