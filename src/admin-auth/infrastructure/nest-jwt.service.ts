import { Injectable } from '@nestjs/common';
import { TokenPayload, TokenService } from '../application/ports/token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestJwtService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(adminUserId: string, adminUserEmail: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: adminUserId,
      email: adminUserEmail,
    } as TokenPayload);
  }

  verify(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
