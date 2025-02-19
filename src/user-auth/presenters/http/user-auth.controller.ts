import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserAuthService } from '../../application/services/user-auth.service';
import { AuthenticateByGoogleDto } from '../../application/dto/authenticate-by-google.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('google')
  authenticateByGoogle(@Body() payload: AuthenticateByGoogleDto) {
    return this.userAuthService.authenticateByGoogle(payload);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUserId() userId: string) {
    return this.userAuthService.getCurrentUser(userId);
  }
}
