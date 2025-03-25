import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserAuthService } from '../../application/services/user-auth.service';
import { AuthenticateByGoogleDto } from '../../application/dto/authenticate-by-google.dto';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { RefreshTokenDto } from '../../application/dto/refresh-token.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleAuthResponse } from '../../application/swagger/google-auth-response';
import { GetCurrentUserQueryResponse } from '../../application/swagger/get-current-user-query-response';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @ApiOperation({
    summary: "Authenticate user by Google's access token",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GoogleAuthResponse,
  })
  @Post('google')
  @HttpCode(HttpStatus.OK)
  authenticateByGoogle(@Body() payload: AuthenticateByGoogleDto) {
    return this.userAuthService.authenticateByGoogle(payload);
  }

  @ApiOperation({
    summary: "Returns current user's data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCurrentUserQueryResponse,
  })
  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUserId() userId: string) {
    return this.userAuthService.getCurrentUser(userId);
  }

  @ApiOperation({
    summary: "Refresh user's access token",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GoogleAuthResponse,
  })
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() payload: RefreshTokenDto) {
    return this.userAuthService.refreshToken(payload.token);
  }
}
