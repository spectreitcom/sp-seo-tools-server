import { Module } from '@nestjs/common';
import { HashingService } from '../application/ports/hashing.service';
import { BcryptHashingService } from './bcrypt-hashing.service';
import { AdminUserRepository } from '../application/ports/admin-user.repository';
import { PrismaAdminUserRepository } from './repositories/prisma-admin-user.repository';
import { DatabaseModule } from '../../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../application/ports/token.service';
import { AppJwtService } from './app-jwt.service';
import { RequestService } from '../application/ports/request.service';
import { AppRequestService } from './app-request.service';
import { CreateAdminCliCommandService } from '../application/ports/create-admin-cli-command.service';
import { AppCreateAdminCliCommandService } from './app-create-admin-cli-command.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ADMIN_JWT_SECRET'),
        signOptions: {
          audience: configService.get<string>('ADMIN_JWT_TOKEN_AUDIENCE'),
          issuer: configService.get<string>('ADMIN_JWT_TOKEN_ISSUER'),
          expiresIn: parseInt(
            configService.get<string>('ADMIN_JWT_ACCESS_TOKEN_TTL'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashingService,
    },
    {
      provide: AdminUserRepository,
      useClass: PrismaAdminUserRepository,
    },
    {
      provide: TokenService,
      useClass: AppJwtService,
    },
    {
      provide: RequestService,
      useClass: AppRequestService,
    },
    {
      provide: CreateAdminCliCommandService,
      useClass: AppCreateAdminCliCommandService,
    },
  ],
  exports: [
    HashingService,
    AdminUserRepository,
    TokenService,
    RequestService,
    CreateAdminCliCommandService,
  ],
})
export class InfrastructureModule {}
