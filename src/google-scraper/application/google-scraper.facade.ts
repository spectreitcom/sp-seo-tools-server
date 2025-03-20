import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from './ports/google-scraper.service';
import { Device } from './types';

@Injectable()
export class GoogleScraperFacade {
  constructor(private readonly googleScraperService: GoogleScraperService) {}

  async getResults(responseId: string, resultsNumber: number) {
    return this.googleScraperService.getResults(responseId, resultsNumber);
  }

  async sendQuery(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
  ) {
    return this.googleScraperService.sendQuery(
      localizationCode,
      resultsNumber,
      query,
      device,
    );
  }
}
