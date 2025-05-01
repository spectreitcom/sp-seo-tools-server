import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserAuthFacade } from './user-auth.facade';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthController } from '../presenters/http/user-auth.controller';
import { GoogleAuthenticateCommandHandler } from './command-handlers/google-authenticate.command-handler';
import { GetCurrentUserQueryHandler } from './query-handlers/get-current-user.query-handler';
import { RefreshTokenCommandHandler } from './command-handlers/refresh-token.command-handler';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [InfrastructureModule, SharedModule],
  controllers: [UserAuthController],
  providers: [
    UserAuthFacade,
    UserAuthService,
    GoogleAuthenticateCommandHandler,
    GetCurrentUserQueryHandler,
    RefreshTokenCommandHandler,
  ],
  exports: [UserAuthFacade],
})
export class UserAuthModule {}
