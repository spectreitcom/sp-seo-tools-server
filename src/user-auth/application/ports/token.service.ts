import { TokenPayload } from '../types';

export abstract class TokenService {
  abstract sign(userId: string, email: string): Promise<string>;
  abstract verify(token: string): Promise<TokenPayload | null>;
}
