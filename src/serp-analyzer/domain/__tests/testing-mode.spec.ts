import { TestingModeFactory } from '../factories/testing-mode.factory';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { ActivateTestingModeError } from '../exceptions';

describe('TestingMode', () => {
  describe('activate', () => {
    it('should activate when user has never bought subscription and never activated testing mode', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        1,
        10,
        false,
        false,
        moment().add(3, 'days').unix(),
      );
      testingMode.activate();
      expect(testingMode.getActive()).toBeTruthy();
    });
    it('should not activate when testing mode was activated in the past', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        1,
        10,
        true,
        false,
        moment().unix(),
      );
      expect(() => testingMode.activate()).toThrow(ActivateTestingModeError);
    });
    it('should not activate when user has bought subscription in the past', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        1,
        10,
        false,
        true,
        moment().unix(),
      );
      expect(() => testingMode.activate()).toThrow(ActivateTestingModeError);
    });
  });
  describe('deactivate', () => {
    it('should deactivate testing mode', () => {
      const testingMode = TestingModeFactory.create(
        randomUUID(),
        1,
        10,
        true,
        false,
        moment().unix(),
      );
      testingMode.deactivate();
      expect(testingMode.getActive()).toBeFalsy();
    });
  });
});
