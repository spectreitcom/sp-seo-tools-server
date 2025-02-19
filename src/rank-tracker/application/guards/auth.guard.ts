import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthFacade } from '../../../user-auth/application/user-auth.facade';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userAuthFacade: UserAuthFacade) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const hasAccess = await this.userAuthFacade.hasAccess(request);

    if (hasAccess) return true;

    throw new UnauthorizedException();
  }
}
