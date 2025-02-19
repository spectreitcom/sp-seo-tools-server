import { Device } from '../device';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from '../../contants';

describe('Device', () => {
  describe('isValid', () => {
    it('should return true when device is valid', () => {
      const device = new Device(DESKTOP_DEVICE);
      const device2 = new Device(MOBILE_DEVICE);
      const device3 = new Device(TABLET_DEVICE);
      const device4 = new Device(null);
      const device5 = new Device(undefined);
      expect(device.isValid()).toBeTruthy();
      expect(device2.isValid()).toBeTruthy();
      expect(device3.isValid()).toBeTruthy();
      expect(device4.isValid()).toBeTruthy();
      expect(device5.isValid()).toBeTruthy();
    });
    it('should return false when device is invalid', () => {
      const device = new Device('wrong device');
      expect(device.isValid()).toBeFalsy();
    });
  });
  describe('equals', () => {
    it('should return true when devices are equal', () => {
      const device = new Device(DESKTOP_DEVICE);
      const device2 = new Device(DESKTOP_DEVICE);
      expect(device.equals(device2)).toBeTruthy();
      expect(device2.equals(device)).toBeTruthy();
    });
    it('should return false when devices are not equal', () => {
      const device = new Device(DESKTOP_DEVICE);
      const device2 = new Device(MOBILE_DEVICE);
      expect(device.equals(device2)).toBeFalsy();
      expect(device2.equals(device)).toBeFalsy();
    });
  });
});
