import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestingModeService } from '../../application/services/testing-mode.service';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserTestingModeInfoReadModelSwagger } from '../../application/swagger/user-testing-mode-info.read-model.swagger';

@Controller('serp-analyzer/testing-mode')
export class TestingModeController {
  constructor(private readonly testingModeService: TestingModeService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Activate testing mode for current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Testing mode was activated',
  })
  @Post('activate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  activate(@CurrentUserId() userId: string) {
    return this.testingModeService.activate(userId);
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    summary: 'Returns information about current user testing mode',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTestingModeInfoReadModelSwagger,
  })
  @Get('user-info')
  @UseGuards(AuthGuard)
  getUserTestingModeInfo(@CurrentUserId() userId: string) {
    return this.testingModeService.getUserTestingModeInfo(userId);
  }
}
