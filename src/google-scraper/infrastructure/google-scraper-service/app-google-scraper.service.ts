import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from '../../application/ports/google-scraper.service';
import {
  Device,
  GetDataResponse,
  SearchResult,
  SendQueryResponse,
} from '../../application/types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QueryRepository } from '../../application/ports/query.repository';

@Injectable()
export class AppGoogleScraperService implements GoogleScraperService {
  private readonly token: string;
  private readonly customer: string;
  private readonly baseUrl: string;
  private readonly zone: string;

  constructor(
    configService: ConfigService,
    private readonly http: HttpService,
    private readonly queryRepository: QueryRepository,
  ) {
    this.baseUrl = configService.get<string>('BRIGHT_DATA_BASE_URL');
    this.token = configService.get<string>('BRIGHT_DATA_TOKEN');
    this.customer = configService.get<string>('BRIGHT_DATA_CUSTOMER');
    this.zone = configService.get<string>('BRIGHT_DATA_ZONE');
  }

  async getResults(responseId: string): Promise<SearchResult[] | null> {
    try {
      const query = await this.queryRepository.findByProcess(responseId);

      if (!query) return null;

      if (query.getStatus() === 'PENDING') return null;

      const results: SearchResult[] = [];

      const searchResults = query.getResults();

      for (let i = 0; i < query.getResultsNumber(); i++) {
        if (searchResults.organic && searchResults.organic[i]) {
          results.push({
            url: searchResults.organic[i].link,
            position: searchResults.organic[i].rank,
          });
        }
      }

      return results;
    } catch (e) {
      throw e;
    }
  }

  async sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post<SendQueryResponse>(
          `${this.baseUrl}/serp/req`,
          {
            country: localizationCode,
            query: {
              q: query,
              num: resultsNumber + 1,
              hl: localizationCode,
              gl: localizationCode,
            },
            brd_json: 'json',
            brd_browser: 'chrome',
            brd_mobile: this.getMobile(device),
          },
          {
            params: {
              customer: this.customer,
              zone: this.zone,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`,
            },
          },
        ),
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  private getMobile(device: Device): string | number | undefined {
    switch (device) {
      case 'mobile':
        return 'ios';
      case 'tablet':
        return 'ipad';
      default:
      case 'desktop':
        return 0;
    }
  }

  async getData(responseId: string) {
    return await firstValueFrom(
      this.http.get<GetDataResponse>(`${this.baseUrl}/serp/get_result`, {
        params: {
          customer: this.customer,
          zone: this.zone,
          response_id: responseId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }),
    );
  }

  isDataAvailableCondition(statusCode: number): boolean {
    return !(statusCode === 202 || statusCode === 101);
  }
}
