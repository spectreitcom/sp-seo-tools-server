import { GetDataResponse, Metadata } from '../application/types';
import { GsQueryStatus } from '@prisma/client';
import { AggregateRoot } from '@nestjs/cqrs';
import { ScrapingFinishedEvent } from './events/scraping-finished.event';
import * as moment from 'moment';
import { ExceededTimeLimitEvent } from './events/exceeded-time-limit.event';

export class Query extends AggregateRoot {
  constructor(
    private readonly queryId: string,
    private readonly processId: string,
    private status: GsQueryStatus,
    private readonly metadata: Metadata,
    private results: GetDataResponse | null,
    private readonly localizationCode: string,
    private readonly resultsNumber: number,
    private readonly query: string,
    private readonly device: string,
    private readonly userId: string,
    private readonly createdAt: number,
    private checkedAt: number,
  ) {
    super();
  }

  checked() {
    this.checkedAt = moment().unix();
  }

  markAsError() {
    this.status = GsQueryStatus.ERROR;
    this.apply(
      new ExceededTimeLimitEvent(this.queryId, this.metadata, this.processId),
    );
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

  getCheckedAt() {
    return this.checkedAt;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  exceededTimeLimit() {
    const now = moment().unix();
    const TIME_LIMIT_SECONDS = 5 * 60;
    return now - this.createdAt > TIME_LIMIT_SECONDS;
  }
}
