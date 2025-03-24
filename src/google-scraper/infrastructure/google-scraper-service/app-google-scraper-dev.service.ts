import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from '../../application/ports/google-scraper.service';
import {
  Device,
  SearchResult,
  SendQueryResponse,
} from '../../application/types';
import { randomUUID } from 'crypto';
import * as _ from 'lodash';
import { randomNumberFromRange } from '../../../shared/utils';

@Injectable()
export class AppGoogleScraperDevService implements GoogleScraperService {
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

  async getResults(
    responseId: string,
    resultsNumber: number,
  ): Promise<SearchResult[] | null> {
    const urls = [...new Array(resultsNumber)].map(() => {
      return `https://example${randomNumberFromRange(1, 4)}.com/page/${randomUUID()}`;
    });
    urls.push('https://example.com/page/contact');

    const shuffledUrls = _.shuffle(urls);

    return shuffledUrls.map((url, index) => ({
      url,
      position: index + 1,
    }));
  }
}
