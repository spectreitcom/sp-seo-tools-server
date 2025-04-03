import { TestingModeFactory } from '../testing-mode.factory';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TestingMode } from '../../testing-mode';

describe('TestingModeFactory', () => {
  describe('create', () => {
    it('should create an instance of TestingMode', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        1,
        10,
        false,
        false,
        moment().add(3, 'days').unix(),
      );

      expect(testingMode).toBeInstanceOf(TestingMode);
    });
  });
});
