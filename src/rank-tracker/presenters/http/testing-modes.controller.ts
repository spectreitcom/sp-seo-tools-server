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

@Controller('rank-tracker/testing-mode')
export class TestingModesController {
  constructor(private readonly testingModeService: TestingModeService) {}

  @Get('user-info')
  @UseGuards(AuthGuard)
  getUserTestingModeInfo(@CurrentUserId() userId: string) {
    return this.testingModeService.getUserTestingModeInfo(userId);
  }

  @Post('activate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  activateTestingMode(@CurrentUserId() userId: string) {
    return this.testingModeService.activateTestingMode(userId);
  }
}
