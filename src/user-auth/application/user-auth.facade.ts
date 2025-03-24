import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AccessService } from './ports/access.service';
import { UserRepository } from './ports/user.repository';

@Injectable()
export class UserAuthFacade {
  constructor(
    private readonly accessService: AccessService,
    private readonly userRepository: UserRepository,
  ) {}

  async hasAccess(request: Request): Promise<boolean> {
    return this.accessService.hasAccess(request);
  }

  async getUserById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async getUserFromRequest(request: Request) {
    return this.accessService.getUserId(request);
  }
}
