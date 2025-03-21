import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DomainPositionStatusUpdatedEvent } from '../../domain/events/domain-position-status-updated.event';
import { Logger } from '@nestjs/common';
import { KeywordRepository } from '../ports/keyword.repository';
import { RtDomainPositionStaus } from '@prisma/client';
import { DomainPositionRepository } from '../ports/domain-position.repository';

@EventsHandler(DomainPositionStatusUpdatedEvent)
export class DomainPositionStatusUpdatedEventHandler
  implements IEventHandler<DomainPositionStatusUpdatedEvent>
{
  private readonly logger = new Logger(DomainPositionStatusUpdatedEvent.name);

  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly domainPositionRepository: DomainPositionRepository,
  ) {}

  async handle(event: DomainPositionStatusUpdatedEvent) {
    this.logger.debug(JSON.stringify(event));
    const { status, keywordId } = event;
    await this.handleStatusDone(status, keywordId);
  }

  private async handleStatusDone(
    status: RtDomainPositionStaus,
    keywordId: string,
  ) {
    if (status === 'DONE') {
      const keyword = await this.keywordRepository.findById(keywordId);
      if (!keyword) return;

      const twoLatestPositions =
        await this.domainPositionRepository.findAllByKeywordK(
          keywordId,
          2,
          0,
          'DONE',
        );

      if (!twoLatestPositions.length) {
        keyword.growthNoChange();
      }

      if (twoLatestPositions.length === 1) {
        keyword.growthNoChange();
      } else {
        const [latestPosition, previousPosition] = twoLatestPositions;

        if (latestPosition.getPosition() === previousPosition.getPosition()) {
          keyword.growthNoChange();
        } else if (
          latestPosition.getPosition() < previousPosition.getPosition()
        ) {
          keyword.growthUp();
        } else {
          keyword.growthDown();
        }
      }

      this.eventPublisher.mergeObjectContext(keyword);
      await this.keywordRepository.save(keyword);
      keyword.commit();
    }
  }
}
