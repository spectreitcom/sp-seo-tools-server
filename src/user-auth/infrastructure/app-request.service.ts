import { Injectable } from '@nestjs/common';
import { RequestService } from '../application/ports/request.service';

@Injectable()
export class AppRequestService implements RequestService {
  extractToken(authHeader: string): string {
    const [_, token] = authHeader.split(' ') ?? [];
    return token && token !== '' ? token : null;
  }
}
