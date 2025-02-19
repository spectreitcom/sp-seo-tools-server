import { EngineKey } from '../engine-key';

describe('EngineKey', () => {
  describe('equals', () => {
    it('should return true when two objects have the same value', () => {
      const value1 = new EngineKey('GOOGLE');
      const value2 = new EngineKey('GOOGLE');
      expect(value1.equals(value2)).toBeTruthy();
      expect(value2.equals(value1)).toBeTruthy();
    });

    it('should return false when two objects have different values', () => {
      const value1 = new EngineKey('GOOGLE');
      const value2 = new EngineKey('YANDEX');
      expect(value1.equals(value2)).toBeFalsy();
      expect(value2.equals(value1)).toBeFalsy();
    });
  });

  describe('isValid', () => {
    it('should return true when the value is valid', () => {
      const value1 = new EngineKey('GOOGLE');
      const value2 = new EngineKey('YANDEX');
      const value3 = new EngineKey('YAHOO');
      expect(value1.isValid()).toBeTruthy();
      expect(value2.isValid()).toBeTruthy();
      expect(value3.isValid()).toBeTruthy();
    });
  });
});
