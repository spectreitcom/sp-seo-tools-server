import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from '../../application/ports/google-scraper.service';
import {
  GetDataResponse,
  SearchResult,
  SendQueryResponse,
} from '../../application/types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { sleep } from '../../../shared/utils';

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
    localizationCode: string,
    resultsNumber: number,
    query: string,
  ): Promise<SearchResult[]> {
    try {
      const { response_id } = await this.sendQuery(
        localizationCode,
        resultsNumber,
        query,
      );
      await sleep(5 * 1000);
      const response = await this.getData(response_id);

      const results: SearchResult[] = [];

      for (let i = 0; i < resultsNumber; i++) {
        if (response.organic && response.organic[i]) {
          results.push({
            url: response.organic[i].link,
            position: i + 1,
          });
        }
      }
      return results;
    } catch (e) {
      throw e;
    }
  }

  private async sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
  ) {
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
        },
        {
          params: {
            params: {
              customer: this.customer,
              zone: this.zone,
            },
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        },
      ),
    );

    return response.data;
  }

  private async getData(responseId: string) {
    const response = await firstValueFrom(
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
    return response.data;
  }
}
