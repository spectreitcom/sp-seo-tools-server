import { Page } from '../../domain/page';

export abstract class PageRepository {
  abstract save(page: Page): Promise<void>;
  abstract saveMany(pages: Page[]): Promise<void>;
  abstract findById(pageId: string): Promise<Page>;
  abstract findByStageId(stageId: string): Promise<Page>;
}
