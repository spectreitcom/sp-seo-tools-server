import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AccessService } from './ports/access.service';

@Injectable()
export class UserAuthFacade {
  constructor(private readonly accessService: AccessService) {}

  async hasAccess(request: Request): Promise<boolean> {
    return this.accessService.hasAccess(request);
  }
}
