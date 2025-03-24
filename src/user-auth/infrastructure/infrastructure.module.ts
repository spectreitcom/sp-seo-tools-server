import { Module } from '@nestjs/common';
import { GoogleAuthenticationService } from '../application/ports/google-authentication.service';
import { AppGoogleAuthenticationService } from './app-google-authentication.service';
import { UserRepository } from '../application/ports/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { DatabaseModule } from '../../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../application/ports/token.service';
import { AppTokenService } from './app-token.service';
import { RequestService } from '../application/ports/request.service';
import { AppRequestService } from './app-request.service';
import { AccessService } from '../application/ports/access.service';
import { AppAccessService } from './app-access.service';
import { RefreshTokenIdsStorageStorage } from '../application/ports/refresh-token-ids-storage.storage';
import { AppRefreshTokenIdsStorage } from './app-refresh-token-ids-storage.storage';
import { TokenHelperService } from '../application/ports/token-helper.service';
import { AppTokenHelperService } from './app-token-helper.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('USER_JWT_SECRET'),
        signOptions: {
          audience: configService.get<string>('USER_JWT_TOKEN_AUDIENCE'),
          issuer: configService.get<string>('USER_JWT_TOKEN_ISSUER'),
          expiresIn: parseInt(
            configService.get<string>('USER_JWT_ACCESS_TOKEN_TTL'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: GoogleAuthenticationService,
      useClass: AppGoogleAuthenticationService,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TokenService,
      useClass: AppTokenService,
    },
    {
      provide: RequestService,
      useClass: AppRequestService,
    },
    {
      provide: AccessService,
      useClass: AppAccessService,
    },
    {
      provide: RefreshTokenIdsStorageStorage,
      useClass: AppRefreshTokenIdsStorage,
    },
    {
      provide: TokenHelperService,
      useClass: AppTokenHelperService,
    },
  ],
  exports: [
    GoogleAuthenticationService,
    UserRepository,
    TokenService,
    RequestService,
    AccessService,
    RefreshTokenIdsStorageStorage,
    TokenHelperService,
  ],
})
export class InfrastructureModule {}
