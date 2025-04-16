import { Injectable } from '@nestjs/common';
import { InvalidDevice } from './exceptions';
import { DeviceValidatorService } from '../../application/ports/device-validator.service';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from './constants';

@Injectable()
export class AppDeviceValidatorService implements DeviceValidatorService {
  validate(device: string): void {
    const devices = [MOBILE_DEVICE, DESKTOP_DEVICE, TABLET_DEVICE];
    if (!devices.includes(device)) throw new InvalidDevice();
  }
}
