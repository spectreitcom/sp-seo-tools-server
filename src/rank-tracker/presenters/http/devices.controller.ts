import { Controller, Get, UseGuards } from '@nestjs/common';
import { DevicesService } from '../../application/services/devices.service';
import { AuthGuard } from '../../application/guards/auth.guard';

@Controller('rank-tracker/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllAvailableForUserDevices() {
    return this.devicesService.getAllAvailableForUserDevices();
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAllDevices() {
    return this.devicesService.getAllDevices();
  }
}
