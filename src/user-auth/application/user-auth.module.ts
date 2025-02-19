import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserAuthFacade } from './user-auth.facade';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthController } from '../presenters/http/user-auth.controller';
import { GoogleAuthenticateCommandHandler } from './command-handlers/google-authenticate.command-handler';
import { GetCurrentUserQueryHandler } from './query-handlers/get-current-user.query-handler';

@Module({
  imports: [InfrastructureModule],
  controllers: [UserAuthController],
  providers: [
    UserAuthFacade,
    UserAuthService,
    GoogleAuthenticateCommandHandler,
    GetCurrentUserQueryHandler,
  ],
  exports: [UserAuthFacade],
})
export class UserAuthModule {}
