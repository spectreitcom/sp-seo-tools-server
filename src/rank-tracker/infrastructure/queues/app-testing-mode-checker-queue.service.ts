import { Injectable } from '@nestjs/common';
import { TestingModeCheckerQueueService } from '../../application/ports/testing-mode-checker-queue.service';
import { TestingModeCheckerProducer } from './producers/testing-mode-checker.producer';

@Injectable()
export class AppTestingModeCheckerQueueService
  implements TestingModeCheckerQueueService
{
  constructor(
    private readonly testingModeCheckerProducer: TestingModeCheckerProducer,
  ) {}

  async checkTestingModes(): Promise<void> {
    await this.testingModeCheckerProducer.add();
  }
}
