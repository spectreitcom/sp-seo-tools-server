import { Injectable } from '@nestjs/common';
import { HtmlService } from '../application/ports/html.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable()
export class AppHtmlService implements HtmlService {
  constructor(
    private readonly http: HttpService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async fromUrl(url: string): Promise<{ html: string; status: number }> {
    try {
      const response = await firstValueFrom(this.http.get(url));

      return {
        html: typeof response.data === 'string' ? response.data : '',
        status: typeof response.data === 'string' ? response.status : 500,
      };
    } catch (e: any) {
      this.errorHandlerService.logError(e, 'AppHtmlService.fromUrl');
      try {
        const response = await firstValueFrom(
          this.http.get(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
            },
          }),
        );

        return {
          html: typeof response.data === 'string' ? response.data : '',
          status: typeof response.data === 'string' ? response.status : 500,
        };
      } catch (e: any) {
        this.errorHandlerService.logError(e, 'AppHtmlService.fromUrl');
        return {
          html: '',
          status: e.response?.status ?? 500,
        };
      }
    }
  }
}
