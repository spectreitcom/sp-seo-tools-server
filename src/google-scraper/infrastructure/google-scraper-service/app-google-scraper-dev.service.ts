import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from '../../application/ports/google-scraper.service';
import {
  Device,
  GetDataResponse,
  SearchResult,
  SendQueryResponse,
} from '../../application/types';
import { randomUUID } from 'crypto';
import * as _ from 'lodash';
import { randomNumberFromRange } from '../../../shared/utils';
import { AxiosResponse } from 'axios';
import { QueryRepository } from '../../application/ports/query.repository';

@Injectable()
export class AppGoogleScraperDevService implements GoogleScraperService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
  ): Promise<SendQueryResponse> {
    return {
      response_id: randomUUID(),
    };
  }

  async getResults(responseId: string): Promise<SearchResult[] | null> {
    const query = await this.queryRepository.findByProcess(responseId);
    if (!query) return null;

    const urls = [...new Array(query.getResultsNumber())].map(() => {
      return `https://example${randomNumberFromRange(1, 4)}.com/page/${randomUUID()}`;
    });
    urls.push('https://example.com/page/contact');

    const shuffledUrls = _.shuffle(urls);

    return shuffledUrls.map((url, index) => ({
      url,
      position: index + 1,
    }));
  }

  async getData(responseId: string): Promise<AxiosResponse<GetDataResponse>> {
    return undefined;
  }

  isDataAvailableCondition(statusCode: number): boolean {
    return false;
  }
}
