import { SaPageFactor } from '@prisma/client';
import { PageFactor } from '../page-factor';

export class PageFactorMapper {
  static toDomain(model: SaPageFactor) {
    return new PageFactor(model.id, model.pageId, model.factor, model.value);
  }
}
