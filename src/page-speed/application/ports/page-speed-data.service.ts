import { PageSpeedData } from '../../infrastructure/types';

export abstract class PageSpeedDataService {
  abstract processData(url: string): Promise<PageSpeedData>;
}
