import { DeviceMapper } from '../device.mapper';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../application/constants';

describe('DeviceMapper', () => {
  describe('toName', () => {
    it('should return device name', () => {
      const deviceName = DeviceMapper.toName(DESKTOP_DEVICE);
      const deviceName2 = DeviceMapper.toName(TABLET_DEVICE);
      const deviceName3 = DeviceMapper.toName(MOBILE_DEVICE);
      expect(deviceName).toBe('Desktop');
      expect(deviceName2).toBe('Tablet');
      expect(deviceName3).toBe('Mobile');
    });
    it('should return null if device is not found', () => {
      const deviceName = DeviceMapper.toName('not-found');
      expect(deviceName).toBe(null);
    });
  });
});
