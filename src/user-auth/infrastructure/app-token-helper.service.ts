import { Injectable } from '@nestjs/common';
import { TokenHelperService } from '../application/ports/token-helper.service';
import { TokenService } from '../application/ports/token.service';
import { RefreshTokenIdsStorageStorage } from '../application/ports/refresh-token-ids-storage.storage';

@Injectable()
export class AppTokenHelperService extends TokenHelperService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenIdsStorageStorage: RefreshTokenIdsStorageStorage,
  ) {
    super();
  }

  async getTokens(
    userId: string,
    email: string,
    refreshTokenId: string,
  ): Promise<[string, string]> {
    const accessToken = await this.tokenService.sign(userId, email);
    const refreshToken = await this.tokenService.signRefreshToken(
      userId,
      email,
      refreshTokenId,
    );
    await this.refreshTokenIdsStorageStorage.insert(userId, refreshTokenId);
    return [accessToken, refreshToken];
  }
}
