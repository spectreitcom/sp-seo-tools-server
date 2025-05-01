import { Injectable } from '@nestjs/common';
import { PageSpeedDataService } from '../application/ports/page-speed-data.service';
import { PageSpeedData } from './types';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable()
export class AppPageSpeedDataService implements PageSpeedDataService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async processData(url: string): Promise<PageSpeedData> {
    try {
      const PAGE_SPEED_API_KEY =
        this.configService.get<string>('PAGE_SPEED_API_KEY');

      const response = await firstValueFrom(
        this.http.get(
          'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
          {
            params: {
              url,
              key: PAGE_SPEED_API_KEY,
            },
          },
        ),
      );

      const data = response.data;

      const ttfb =
        data['lighthouseResult']['audits']['server-response-time'][
          'numericValue'
        ] ?? 0;

      const documentSize =
        data['lighthouseResult']['audits']['total-byte-weight'][
          'numericValue'
        ] ?? 0;

      const fcp =
        data['lighthouseResult']['audits']['first-contentful-paint'][
          'numericValue'
        ] ?? 0;

      const lcp =
        data['lighthouseResult']['audits']['largest-contentful-paint'][
          'numericValue'
        ] ?? 0;

      const tti =
        data['lighthouseResult']['audits']['interactive']['numericValue'] ?? 0;

      return {
        documentSize,
        tti,
        fcp,
        lcp,
        ttfb,
      };
    } catch (e) {
      this.errorHandlerService.logError(
        e,
        'AppPageSpeedDataService.processData',
      );
      throw e;
    }
  }
}
