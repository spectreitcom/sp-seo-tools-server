import { TestingMode } from '../testing-mode';
import { randomUUID } from 'crypto';
import { CannotActivateTestingModeError } from '../exceptions';
import * as moment from 'moment';
import { ExpiresAt } from '../value-objects/expires-at';

const TESTING_MODE_ID = randomUUID();
const USER_ID = randomUUID();

describe('TestingMode', () => {
  describe('activate', () => {
    it('should be able to activate testing mode when user has not activated testing mode so far and has not bought subscription', () => {
      const wasActivatedEarlier = false;
      const userHasEverBoughtSubscription = false;
      const active = false;
      const expiresAt = moment().add(1, 'day').unix();
      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        wasActivatedEarlier,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      testingMode.activate();
      expect(testingMode.getActive()).toBeTruthy();
    });
    it('should not activate testing mode when user activated testing mode in the past', () => {
      const wasActivatedEarlier = true;
      const userHasEverBoughtSubscription = false;
      const active = false;
      const expiresAt = moment().add(1, 'day').unix();
      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        wasActivatedEarlier,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      expect(() => testingMode.activate()).toThrow(
        CannotActivateTestingModeError,
      );
    });
    it('should not activate testing mode when user bought subscription in the past, but did not activated testing mode', () => {
      const wasActivatedEarlier = false;
      const userHasEverBoughtSubscription = true;
      const active = false;
      const expiresAt = moment().add(1, 'day').unix();

      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        wasActivatedEarlier,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      expect(() => testingMode.activate()).toThrow(
        CannotActivateTestingModeError,
      );
    });
    it('should not activate testing mode when user bought subscription in the past, and  activated testing mode in the past', () => {
      const userTestingModeInfo = true;
      const userHasEverBoughtSubscription = true;
      const active = false;
      const expiresAt = moment().add(1, 'day').unix();

      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        userTestingModeInfo,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      expect(() => testingMode.activate()).toThrow(
        CannotActivateTestingModeError,
      );
    });
    it('should not activate testing mode when user just activated testing mode', () => {
      const wasActivatedEarlier = true;
      const userHasEverBoughtSubscription = false;
      const active = true;
      const expiresAt = moment().add(1, 'day').unix();

      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        wasActivatedEarlier,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      expect(() => testingMode.activate()).toThrow(
        CannotActivateTestingModeError,
      );
    });
  });
  describe('deactivate', () => {
    it('should deactivate testing mode', () => {
      const wasActivatedEarlier = true;
      const userHasEverBoughtSubscription = false;
      const active = true;
      const expiresAt = moment().add(1, 'day').unix();

      const testingMode = new TestingMode(
        TESTING_MODE_ID,
        USER_ID,
        wasActivatedEarlier,
        userHasEverBoughtSubscription,
        active,
        new ExpiresAt(expiresAt),
        5,
        10,
      );
      testingMode.deactivate();
      expect(testingMode.getActive()).toBeFalsy();
    });
  });
});
