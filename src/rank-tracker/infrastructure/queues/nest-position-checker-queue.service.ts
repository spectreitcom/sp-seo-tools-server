import { Injectable } from '@nestjs/common';
import { PositionCheckerQueueService } from '../../application/ports/position-checker-queue.service';
import { PositionCheckerProducer } from './producers/position-checker.producer';

@Injectable()
export class NestPositionCheckerQueueService
  implements PositionCheckerQueueService
{
  constructor(
    private readonly positionCheckerProducer: PositionCheckerProducer,
  ) {}

  async checkPositions() {
    await this.positionCheckerProducer.add();
  }
}
