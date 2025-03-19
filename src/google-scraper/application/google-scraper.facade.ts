import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from './ports/google-scraper.service';
import { Device } from './types';

@Injectable()
export class GoogleScraperFacade {
  constructor(private readonly googleScraperService: GoogleScraperService) {}

  async getResults(
    localizationCode: string,
    resultsNumber: number,
    query: string,
    device: Device,
  ) {
    return this.googleScraperService.getResults(
      localizationCode,
      resultsNumber,
      query,
      device,
    );
  }
}
