import { Processor, WorkerHost } from '@nestjs/bullmq';
import { CHECKING_QUERY_QUEUE } from '../constants';
import { QueryRepository } from '../../../application/ports/query.repository';
import { GoogleScraperService } from '../../../application/ports/google-scraper.service';
import { sleep } from '../../../../shared/utils';
import { Query } from '../../../domain/query';
import { EventPublisher } from '@nestjs/cqrs';

const TAKE = 100;

@Processor(CHECKING_QUERY_QUEUE)
export class CheckingQueryConsumer extends WorkerHost {
  constructor(
    private readonly queryRepository: QueryRepository,
    private readonly googleScraperService: GoogleScraperService,
    private readonly eventPublisher: EventPublisher,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;

    let queries = await this.queryRepository.findAllPending(TAKE, skip);

    if (!queries) return;

    while (!!queries.length) {
      for (const query of queries) {
        await sleep(5 * 1000);
        await this.processQuery(query);
        skip = TAKE * (skip + 1);
        queries = await this.queryRepository.findAllPending(TAKE, skip);
      }
    }
  }

  private async processQuery(query: Query) {
    const response = await this.googleScraperService.getData(
      query.getProcessId(),
    );

    if (!this.googleScraperService.isDataAvailableCondition(response.status))
      return null;

    this.eventPublisher.mergeObjectContext(query);
    query.finish(response.data);
    await this.queryRepository.save(query);
    query.commit();
  }
}
