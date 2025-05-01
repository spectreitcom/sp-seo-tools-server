import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AdminAuthFacade } from './admin-auth.facade';
import { CreateAdminCommand } from './cli/create-admin.command';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminAuthController } from '../presenters/http/admin-auth.controller';
import { AuthenticateCommandHandler } from './command-handlers/authenticate.command-handler';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [InfrastructureModule, SharedModule],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthFacade,
    CreateAdminCommand,
    AdminAuthService,
    AuthenticateCommandHandler,
  ],
  exports: [AdminAuthFacade],
})
export class AdminAuthModule {}
