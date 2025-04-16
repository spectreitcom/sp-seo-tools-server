import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestingModeService } from '../../application/services/testing-mode.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserTestingModeInfoDto } from '../../application/swagger/user-testing-mode-info.dto';

@Controller('rank-tracker/testing-mode')
export class TestingModesController {
  constructor(private readonly testingModeService: TestingModeService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns information about current user testing mode',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTestingModeInfoDto,
  })
  @Get('user-info')
  @UseGuards(AuthGuard)
  getUserTestingModeInfo(@CurrentUserId() userId: string) {
    return this.testingModeService.getUserTestingModeInfo(userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Activate testing mode for current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Testing mode was activated',
  })
  @Post('activate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  activateTestingMode(@CurrentUserId() userId: string) {
    return this.testingModeService.activateTestingMode(userId);
  }
}
