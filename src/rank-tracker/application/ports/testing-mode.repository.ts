import { TestingMode } from '../../domain/testing-mode';

export abstract class TestingModeRepository {
  abstract save(testingMode: TestingMode): Promise<void>;
  abstract hasUserAlreadyActivated(userId: string): Promise<boolean>;
  abstract findAllActive(take: number, skip: number): Promise<TestingMode[]>;
  abstract findByUserId(userId: string): Promise<TestingMode>;
  abstract findAllActiveByUserIds(userIds: string[]): Promise<TestingMode[]>;
}
