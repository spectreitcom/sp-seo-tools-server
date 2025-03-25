import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AdminAuthService } from '../../application/services/admin-auth.service';
import { SignInDto } from '../../application/dto/sign-in.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticateCommandResponse } from '../../application/swagger/authenticate-command-response';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @ApiOperation({
    summary: 'Sign in',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthenticateCommandResponse,
  })
  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.adminAuthService.signIn(payload);
  }
}
