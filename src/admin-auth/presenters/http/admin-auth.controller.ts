import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from '../../application/services/admin-auth.service';
import { SignInDto } from '../../application/dto/sign-in.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.adminAuthService.signIn(payload);
  }
}
