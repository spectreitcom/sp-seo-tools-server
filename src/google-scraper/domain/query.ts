import { Device, GetDataResponse, Metadata } from '../application/types';
import { GsQueryStatus } from '@prisma/client';
import { AggregateRoot } from '@nestjs/cqrs';
import { ScrapingFinishedEvent } from './events/scraping-finished.event';

export class Query extends AggregateRoot {
  constructor(
    private queryId: string,
    private processId: string,
    private status: GsQueryStatus,
    private metadata: Metadata,
    private results: GetDataResponse | null,
    private localizationCode: string,
    private resultsNumber: number,
    private query: string,
    private device: Device,
    private userId: string,
  ) {
    super();
  }

  finish(results: GetDataResponse) {
    this.status = GsQueryStatus.DONE;
    this.results = results;
    this.apply(
      new ScrapingFinishedEvent(
        this.queryId,
        this.processId,
        this.metadata,
        this.results,
        this.localizationCode,
        this.resultsNumber,
        this.query,
        this.device,
      ),
    );
  }

  getQueryId() {
    return this.queryId;
  }

  getProcessId() {
    return this.processId;
  }

  getStatus() {
    return this.status;
  }

  getResults() {
    return this.results;
  }

  getMetadata() {
    return this.metadata;
  }

  getLocalizationCode() {
    return this.localizationCode;
  }

  getResultsNumber() {
    return this.resultsNumber;
  }

  getQuery() {
    return this.query;
  }

  getDevice() {
    return this.device;
  }

  getUserId() {
    return this.userId;
  }
}
