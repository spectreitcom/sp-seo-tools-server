import { Injectable } from '@nestjs/common';
import { TokenService } from './ports/token.service';
import { Request } from 'express';
import { RequestService } from './ports/request.service';

@Injectable()
export class AdminAuthFacade {
  constructor(
    private readonly tokenService: TokenService,
    private readonly requestService: RequestService,
  ) {}

  async hasAccess(request: Request): Promise<boolean> {
    try {
      const token = this.requestService.extractToken(
        request.headers.authorization ?? '',
      );
      if (!token) return false;
      await this.tokenService.verify(token);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
