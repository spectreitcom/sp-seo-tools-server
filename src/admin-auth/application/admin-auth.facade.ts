import { Injectable } from '@nestjs/common';
import { TokenService } from './ports/token.service';
import { Request } from 'express';
import { RequestService } from './ports/request.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable()
export class AdminAuthFacade {
  constructor(
    private readonly tokenService: TokenService,
    private readonly requestService: RequestService,
    private readonly errorHandlerService: ErrorHandlerService,
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
      this.errorHandlerService.logError(e, 'AdminAuthFacade.hasAccess');
      return false;
    }
  }
}
