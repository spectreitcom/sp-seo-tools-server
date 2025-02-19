import { Request } from 'express';

export abstract class AccessService {
  abstract hasAccess(request: Request): Promise<boolean>;
  abstract getUserId(request: Request): Promise<string | null>;
}
