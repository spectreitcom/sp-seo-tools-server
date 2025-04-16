import { Processor, WorkerHost } from '@nestjs/bullmq';
import { POSITION_CHECKER_QUEUE } from '../constants';
import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { sleep } from '../../../../shared/utils';
import { PositionCheckerService } from '../../../application/ports/position-checker.service';

const TAKE = 100;

@Processor(POSITION_CHECKER_QUEUE)
export class PositionCheckerConsumer extends WorkerHost {
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly positionCheckerService: PositionCheckerService,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;

    let keywords = await this.keywordRepository.findAll(TAKE, skip);

    while (keywords.length) {
      for (const keyword of keywords) {
        await sleep(5000);
        await this.positionCheckerService.checkPosition(keyword);
      }

      skip = TAKE * (skip + 1);
      keywords = await this.keywordRepository.findAll(TAKE, skip);
    }
  }
}
