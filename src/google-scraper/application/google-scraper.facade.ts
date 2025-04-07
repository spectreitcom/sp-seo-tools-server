import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from './ports/google-scraper.service';
import { Metadata } from './types';
import { QueryRepository } from './ports/query.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryFactory } from '../domain/factories/query.factory';

@Injectable()
export class GoogleScraperFacade {
  constructor(
    private readonly googleScraperService: GoogleScraperService,
    private readonly queryRepository: QueryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async getResults(responseId: string) {
    return this.googleScraperService.getResults(responseId);
  }

  async sendQuery(
    localizationCode: string,
    resultsNumber: number,
    queryText: string,
    device: string,
    userId: string,
    metadata?: Metadata,
  ) {
    const response = await this.googleScraperService.sendQuery(
      localizationCode,
      resultsNumber,
      queryText,
      device,
    );

    const query = QueryFactory.create(
      response.response_id,
      metadata,
      localizationCode,
      resultsNumber,
      queryText,
      device,
      userId,
    );
    this.eventPublisher.mergeObjectContext(query);
    await this.queryRepository.save(query);
    query.commit();

    return response;
  }
}
