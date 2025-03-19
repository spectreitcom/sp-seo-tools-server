export abstract class TokenHelperService {
  abstract getTokens(
    userId: string,
    email: string,
    refreshTokenId: string,
  ): Promise<[string, string]>;
}
