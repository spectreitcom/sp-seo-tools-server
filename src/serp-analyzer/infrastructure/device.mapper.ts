import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../domain/constants';

export class DeviceMapper {
  static toName(device: string): string | null {
    switch (device) {
      case DESKTOP_DEVICE:
        return 'Desktop';
      case TABLET_DEVICE:
        return 'Tablet';
      case MOBILE_DEVICE:
        return 'Mobile';
      default:
        return null;
    }
  }
}
