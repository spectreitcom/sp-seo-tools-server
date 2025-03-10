import { Injectable } from '@nestjs/common';
import { GoogleScraperService } from './ports/google-scraper.service';

@Injectable()
export class GoogleScraperFacade {
  constructor(private readonly googleScraperService: GoogleScraperService) {}

  async getResults(
    localizationCode: string,
    resultsNumber: number,
    query: string,
  ) {
    return this.googleScraperService.getResults(
      localizationCode,
      resultsNumber,
      query,
    );
  }
}
