import { Injectable } from '@nestjs/common';
import { AccessService } from '../application/ports/access.service';
import { Request } from 'express';
import { RequestService } from '../application/ports/request.service';
import { TokenService } from '../application/ports/token.service';
import { TokenPayload } from '../application/types';

@Injectable()
export class AppAccessService implements AccessService {
  constructor(
    private readonly requestService: RequestService,
    private readonly tokenService: TokenService,
  ) {}

  async hasAccess(request: Request): Promise<boolean> {
    const tokenPayload = await this.verifyToken(request);
    return !!tokenPayload;
  }

  async getUserId(request: Request): Promise<string | null> {
    const tokenPayload = await this.verifyToken(request);
    if (!tokenPayload) return null;
    return tokenPayload.sub;
  }

  private verifyToken(request: Request): Promise<TokenPayload | null> {
    try {
      const token = this.requestService.extractToken(
        request.headers?.authorization ?? '',
      );
      if (!token) return null;
      return this.tokenService.verify(token);
    } catch (_) {
      return null;
    }
  }
}
