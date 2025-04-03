import { TestingMode } from '../testing-mode';
import { SaTestingMode } from '@prisma/client';
import { ExpiresAt } from '../value-objects/expires-at';

export class TestingModeMapper {
  static toDomain(
    model: SaTestingMode,
    wasActivatedEarlier: boolean,
    userHasEverBoughtSubscription: boolean,
  ) {
    return new TestingMode(
      model.id,
      model.userId,
      model.active,
      model.searchedPages,
      model.analysisPerMonth,
      wasActivatedEarlier,
      userHasEverBoughtSubscription,
      new ExpiresAt(model.expiresAt),
    );
  }
}
