import { Injectable } from '@nestjs/common';
import { DomainPositionProcessingQueueService } from '../../application/ports/domain-position-processing-queue.service';
import { DomainPositionProcessingProducer } from './producers/domain-position-processing.producer';

@Injectable()
export class AppDomainPositionProcessingQueueService
  implements DomainPositionProcessingQueueService
{
  constructor(
    private readonly domainPositionProcessingProducer: DomainPositionProcessingProducer,
  ) {}

  async processPositions() {
    await this.domainPositionProcessingProducer.add();
  }
}
