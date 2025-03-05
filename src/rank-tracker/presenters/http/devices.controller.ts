import { Controller, Get, UseGuards } from '@nestjs/common';
import { DevicesService } from '../../application/services/devices.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { CurrentUserId } from '../../application/decorators/current-user-id.decorator';

@Controller('rank-tracker/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllAvailableForUserDevices(@CurrentUserId() userId: string) {
    return this.devicesService.getAllAvailableForUserDevices(userId);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAllDevices() {
    return this.devicesService.getAllDevices();
  }
}
