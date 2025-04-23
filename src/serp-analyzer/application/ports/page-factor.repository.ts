import { PageFactor } from '../../domain/page-factor';

export abstract class PageFactorRepository {
  abstract save(pageFactor: PageFactor): Promise<void>;
  abstract saveMany(pageFactors: PageFactor[]): Promise<void>;
  abstract findByPage(pageId: string): Promise<PageFactor[]>;
}
