import { Injectable } from '@nestjs/common';
import { ScrapeStrategy } from './strategies/scrape-strategy';

@Injectable()
export class SerpapiClient {
  async scrape(
    query: string,
    page: number,
    device: string,
    strategy: ScrapeStrategy,
    domainParam: string,
  ) {
    return await strategy.scrape(query, page, device, domainParam);
  }
}
