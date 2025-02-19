import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessService } from '../ports/access.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly accessService: AccessService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const hasAccess = await this.accessService.hasAccess(request);

    request.userId = await this.accessService.getUserId(request);

    if (hasAccess) return true;

    throw new UnauthorizedException();
  }
}
