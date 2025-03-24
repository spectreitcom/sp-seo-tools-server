import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminAuthFacade } from '../../../admin-auth/application/admin-auth.facade';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly adminAuthFacade: AdminAuthFacade) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const hasAccess = await this.adminAuthFacade.hasAccess(request);

    if (hasAccess) return true;

    throw new UnauthorizedException();
  }
}
