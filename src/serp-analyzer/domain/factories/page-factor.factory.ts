import { PageFactor } from '../page-factor';
import { randomUUID } from 'crypto';

export class PageFactorFactory {
  static create(pageId: string, factor: string, value: number) {
    return new PageFactor(randomUUID(), pageId, factor, value);
  }
}
