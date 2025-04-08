import { Page } from '../page';
import { randomUUID } from 'crypto';

export class PageFactory {
  static create(
    url: string,
    position: number,
    analysisId: string,
    stages: string[],
    html: string,
  ) {
    return new Page(randomUUID(), url, position, analysisId, stages, html);
  }
}
