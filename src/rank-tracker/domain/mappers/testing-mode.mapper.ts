import { TestingMode } from '../testing-mode';
import { RtTestingMode } from '@prisma/client';
import { ExpiresAt } from '../value-objects/expires-at';

export class TestingModeMapper {
  static toDomain(
    rtTestingMode: RtTestingMode,
    wasActivatedEarlier: boolean,
    userHasEverBoughtSubscription: boolean,
  ) {
    return new TestingMode(
      rtTestingMode.id,
      rtTestingMode.userId,
      wasActivatedEarlier,
      userHasEverBoughtSubscription,
      rtTestingMode.active,
      new ExpiresAt(rtTestingMode.expiresAt),
      rtTestingMode.maxKeywordsQty,
      rtTestingMode.maxSearchedPages,
    );
  }
}
