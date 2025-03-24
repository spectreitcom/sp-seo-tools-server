export type TokenPayload = {
  sub: string;
  email: string;
};

export abstract class TokenService {
  abstract sign(adminUserId: string, adminUserEmail: string): Promise<string>;
  abstract verify(token: string): Promise<TokenPayload>;
}
