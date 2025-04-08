import { Page } from '../page';
import { SaPage } from '@prisma/client';

export class PageMapper {
  static toDomain(model: SaPage, stages: string[]) {
    return new Page(
      model.id,
      model.url,
      model.position,
      model.analysisId,
      stages,
      model.html,
    );
  }
}
