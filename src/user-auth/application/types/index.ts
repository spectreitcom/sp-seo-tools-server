export type CommandResponse = {
  accessToken: string;
};

export type GoogleAuthenticateResponse = {
  email: string;
  googleId: string;
};

export type TokenPayload = {
  sub: string;
  email: string;
};
