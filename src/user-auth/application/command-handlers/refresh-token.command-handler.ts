import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../commands/refresh-token.command';
import { GoogleAuthResponse } from '../types';
import { TokenService } from '../ports/token.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { RefreshTokenIdsStorageStorage } from '../ports/refresh-token-ids-storage.storage';
import { randomUUID } from 'crypto';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand, GoogleAuthResponse>
{
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenIdsStorageStorage: RefreshTokenIdsStorageStorage,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<GoogleAuthResponse> {
    try {
      const { token } = command;
      const { sub, tokenId } = await this.tokenService.verify(token);
      const user = await this.getUser(sub);

      await this.validateToken(user.id, tokenId);

      const refreshTokenId = randomUUID();

      const accessToken = await this.tokenService.sign(user.id, user.email);
      const refreshToken = await this.tokenService.signRefreshToken(
        user.id,
        user.email,
        refreshTokenId,
      );

      await this.refreshTokenIdsStorageStorage.insert(user.id, refreshTokenId);

      return {
        accessToken,
        refreshToken,
      };
    } catch (_) {
      throw new UnauthorizedException();
    }
  }

  private async getUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async validateToken(userId: string, tokenId: string) {
    const isValid = await this.refreshTokenIdsStorageStorage.validate(
      userId,
      tokenId,
    );

    if (isValid) {
      await this.refreshTokenIdsStorageStorage.invalidate(userId);
    } else {
      throw new UnauthorizedException();
    }
  }
}
