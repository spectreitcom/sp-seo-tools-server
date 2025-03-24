import { GoogleAuthenticateResponse } from '../types';

export abstract class GoogleAuthenticationService {
  abstract authenticate(token: string): Promise<GoogleAuthenticateResponse>;
}
