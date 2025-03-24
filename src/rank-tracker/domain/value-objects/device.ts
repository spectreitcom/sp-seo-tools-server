import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../application/constants';

export class Device {
  constructor(public readonly value: string | null | undefined) {}

  isValid() {
    if (this.value === null || this.value === undefined) return true;
    return [DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE].includes(this.value);
  }

  equals(device: Device) {
    return this.value === device.value;
  }
}
