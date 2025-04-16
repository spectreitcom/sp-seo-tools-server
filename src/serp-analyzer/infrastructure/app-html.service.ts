import { Injectable } from '@nestjs/common';
import { HtmlService } from '../application/ports/html.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppHtmlService implements HtmlService {
  constructor(private readonly http: HttpService) {}

  async fromUrl(url: string): Promise<{ html: string; status: number }> {
    try {
      const response = await firstValueFrom(this.http.get(url));
      return {
        html: response.data,
        status: response.status,
      };
    } catch (e: any) {
      return {
        html: '',
        status: e.response?.status ?? 500,
      };
    }
  }
}
