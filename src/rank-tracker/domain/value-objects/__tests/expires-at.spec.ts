import * as moment from 'moment';
import { ExpiresAt } from '../expires-at';

const NOW = moment().unix();

describe('ExpiresAt', () => {
  describe('isExpired', () => {
    it('should return true when expiresAt is in the past', () => {
      const expiresAt = new ExpiresAt(moment().subtract(1, 'day').unix());
      expect(expiresAt.isExpired()).toBeTruthy();
    });
    it('should return false when expiresAt is in the future', () => {
      const expiresAt = new ExpiresAt(moment().add(1, 'day').unix());
      expect(expiresAt.isExpired()).toBeFalsy();
    });
  });

  describe('equals', () => {
    it('should return true when expiresAt values are the same', () => {
      const expiresAt = new ExpiresAt(NOW);
      const expiresAt2 = new ExpiresAt(NOW);
      expect(expiresAt.equals(expiresAt2)).toBeTruthy();
      expect(expiresAt2.equals(expiresAt)).toBeTruthy();
    });
    it('should return false when expiresAt values are different', () => {
      const expiresAt = new ExpiresAt(NOW);
      const expiresAt2 = new ExpiresAt(moment().add(1, 'day').unix());
      expect(expiresAt.equals(expiresAt2)).toBeFalsy();
      expect(expiresAt2.equals(expiresAt)).toBeFalsy();
    });
  });
});
