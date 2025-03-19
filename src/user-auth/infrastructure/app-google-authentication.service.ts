import { Injectable } from '@nestjs/common';
import { GoogleAuthenticationService } from '../application/ports/google-authentication.service';
import { GoogleAuthenticateResponse } from '../application/types';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthenticateError } from './exceptions';

@Injectable()
export class AppGoogleAuthenticationService
  implements GoogleAuthenticationService
{
  private readonly oauthClient: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(token: string): Promise<GoogleAuthenticateResponse> {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      const { sub: googleId, email, picture } = loginTicket.getPayload();

      return {
        email,
        googleId,
        picture,
      };
    } catch (_) {
      throw new GoogleAuthenticateError();
    }
  }
}
