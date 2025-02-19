import { ScrapeStrategy } from './scrape-strategy';
import { SearchResult, SerpApiResponse } from '../types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export class GoogleStrategy implements ScrapeStrategy {
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  async scrape(
    query: string,
    page: number,
    device: string,
    domainParam: string,
  ): Promise<SearchResult[]> {
    const API_KEY = this.configService.get<string>('SERP_API_API_KEY');
    const BASE_URL = this.configService.get<string>('SERP_API_BASE_URL');

    const start = (page - 1) * 10;

    const url = `${BASE_URL}/search`;
    const params = {
      api_key: API_KEY,
      q: query,
      device,
      start,
      google_domain: domainParam,
    };

    const response = await firstValueFrom(
      this.http.get<SerpApiResponse>(url, {
        params,
      }),
    );

    return response.data.organic_results.map((item) => ({
      position: item.position,
      url: item.link,
    }));
  }
}
