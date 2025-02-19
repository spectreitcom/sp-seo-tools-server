import { Controller, Get } from '@nestjs/common';
import { DevicesService } from '../../application/services/devices.service';

@Controller('rank-tracker/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  getAllDevices() {
    return this.devicesService.getAllDevices();
  }
}
