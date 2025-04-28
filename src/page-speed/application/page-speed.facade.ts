import { Injectable } from '@nestjs/common';
import { PageSpeedData } from '../infrastructure/types';
import { PageSpeedDataService } from './ports/page-speed-data.service';

@Injectable()
export class PageSpeedFacade {
  constructor(private readonly pageSpeedDataService: PageSpeedDataService) {}

  async processPage(url: string): Promise<PageSpeedData> {
    return this.pageSpeedDataService.processData(url);
  }
}
