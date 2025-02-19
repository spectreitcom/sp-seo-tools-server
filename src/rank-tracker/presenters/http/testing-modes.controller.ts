import { Controller, Post } from '@nestjs/common';
import { TestingModeService } from '../../application/services/testing-mode.service';

@Controller('rank-tracker/testing-mode')
export class TestingModesController {
  constructor(private readonly testingModeService: TestingModeService) {}

  @Post('activate')
  activateTestingMode() {
    return this.testingModeService.activateTestingMode('userId'); // todo;
  }
}
