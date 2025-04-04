import { TestingMode } from '../../domain/testing-mode';

export abstract class TestingModeRepository {
  abstract save(testingMode: TestingMode): Promise<void>;
  abstract findByUser(userId: string): Promise<TestingMode>;
  abstract findAllActive(take: number, skip: number): Promise<TestingMode[]>;
}
