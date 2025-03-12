import { Module } from '@nestjs/common';
import { GoogleAuthenticationService } from '../application/ports/google-authentication.service';
import { NestGoogleAuthenticationService } from './nest-google-authentication.service';
import { UserRepository } from '../application/ports/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { DatabaseModule } from '../../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../application/ports/token.service';
import { NestTokenService } from './nest-token.service';
import { RequestService } from '../application/ports/request.service';
import { NestRequestService } from './nest-request.service';
import { AccessService } from '../application/ports/access.service';
import { NestAccessService } from './nest-access.service';
import { RefreshTokenIdsStorageStorage } from '../application/ports/refresh-token-ids-storage.storage';
import { AppRefreshTokenIdsStorage } from './app-refresh-token-ids-storage.storage';

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
      useClass: NestGoogleAuthenticationService,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TokenService,
      useClass: NestTokenService,
    },
    {
      provide: RequestService,
      useClass: NestRequestService,
    },
    {
      provide: AccessService,
      useClass: NestAccessService,
    },
    {
      provide: RefreshTokenIdsStorageStorage,
      useClass: AppRefreshTokenIdsStorage,
    },
  ],
  exports: [
    GoogleAuthenticationService,
    UserRepository,
    TokenService,
    RequestService,
    AccessService,
    RefreshTokenIdsStorageStorage,
  ],
})
export class InfrastructureModule {}
