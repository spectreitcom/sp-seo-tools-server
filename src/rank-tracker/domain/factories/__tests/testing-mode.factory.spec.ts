import { TestingModeFactory } from '../testing-mode.factory';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TestingMode } from '../../testing-mode';

describe('TestingModeFactory', () => {
  describe('create', () => {
    it('should create TestingMode instance', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        false,
        false,
        moment().add(1, 'day').unix(),
        5,
        10,
      );
      expect(testingMode).toBeInstanceOf(TestingMode);
    });
  });
});
