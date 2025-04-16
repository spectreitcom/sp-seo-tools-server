import { Processor, WorkerHost } from '@nestjs/bullmq';
import { TESTING_MODE_CHECKER_QUEUE } from '../constants';
import { TestingModeRepository } from '../../../application/ports/testing-mode.repository';
import { TestingMode } from '../../../domain/testing-mode';
import { EventPublisher } from '@nestjs/cqrs';

const TAKE = 100;

@Processor(TESTING_MODE_CHECKER_QUEUE)
export class TestingModeCheckerConsumer extends WorkerHost {
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;

    let testingModes = await this.testingModeRepository.findAllActive(
      TAKE,
      skip,
    );

    while (testingModes.length) {
      for (const testingMode of testingModes) {
        await this.tryDeactivateTestingMode(testingMode);
      }

      skip = TAKE * (skip + 1);

      testingModes = await this.testingModeRepository.findAllActive(TAKE, skip);
    }
  }

  private async tryDeactivateTestingMode(testingMode: TestingMode) {
    if (testingMode.getExpiresAt().isExpired()) {
      testingMode.deactivate();
      this.eventPublisher.mergeObjectContext(testingMode);
      await this.testingModeRepository.save(testingMode);
      testingMode.commit();
    }
  }
}
