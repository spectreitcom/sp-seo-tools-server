import { Injectable } from '@nestjs/common';
import { TokenService } from '../application/ports/token.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../application/types';

@Injectable()
export class AppTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
      email,
    } as TokenPayload);
  }

  async verify(token: string): Promise<TokenPayload | null> {
    try {
      // returning the result of the verification directly from verifyAsync doesnt work properly
      // so we need to await the result and then return it
      const result = await this.jwtService.verifyAsync(token);
      return result;
    } catch (_) {
      return null;
    }
  }

  signRefreshToken(
    userId: string,
    email: string,
    tokenId: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
        tokenId,
      } as TokenPayload,
      {
        expiresIn: 60 * 60 * 24,
      },
    );
  }
}
