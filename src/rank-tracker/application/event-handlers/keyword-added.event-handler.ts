import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KeywordAddedEvent } from '../../domain/events/keyword-added.event';
import { Logger } from '@nestjs/common';
import { KeywordRepository } from '../ports/keyword.repository';
import { PositionCheckerService } from '../ports/position-checker.service';
import { sleep } from '../../../shared/utils';

@EventsHandler(KeywordAddedEvent)
export class KeywordAddedEventHandler
  implements IEventHandler<KeywordAddedEvent>
{
  private readonly logger = new Logger(KeywordAddedEvent.name);

  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly positionCheckerService: PositionCheckerService,
  ) {}

  async handle(event: KeywordAddedEvent) {
    this.logger.debug(JSON.stringify(event));
    const { keywordId } = event;
    const keyword = await this.keywordRepository.findById(keywordId);
    await sleep(5000);
    await this.positionCheckerService.checkPosition(keyword);
  }
}
