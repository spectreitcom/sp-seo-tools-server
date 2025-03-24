export type GoogleAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type GoogleAuthenticateResponse = {
  email: string;
  googleId: string;
  picture: string | null;
};

export type TokenPayload = {
  sub: string;
  email: string;
  tokenId?: string;
};
