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

@Injectable()
export class AppGoogleScraperService implements GoogleScraperService {
  private readonly token: string;
  private readonly customer: string;
  private readonly baseUrl: string;
  private readonly zone: string;

  constructor(
    configService: ConfigService,
    private readonly http: HttpService,
  ) {
    this.baseUrl = configService.get<string>('BRIGHT_DATA_BASE_URL');
    this.token = configService.get<string>('BRIGHT_DATA_TOKEN');
    this.customer = configService.get<string>('BRIGHT_DATA_CUSTOMER');
    this.zone = configService.get<string>('BRIGHT_DATA_ZONE');
  }

  async getResults(
    responseId: string,
    resultsNumber: number,
  ): Promise<SearchResult[] | null> {
    try {
      const response = await this.getData(responseId);

      if (response.status === 202 || response.status === 101) return null;

      const results: SearchResult[] = [];

      for (let i = 0; i < resultsNumber; i++) {
        if (response.data.organic && response.data.organic[i]) {
          results.push({
            url: response.data.organic[i].link,
            position: response.data.organic[i].rank,
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
              num: resultsNumber,
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
}
