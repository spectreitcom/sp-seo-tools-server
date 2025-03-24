export abstract class RequestService {
  abstract extractToken(authHeader: string): string;
}
