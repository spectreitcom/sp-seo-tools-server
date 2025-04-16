import { Controller, Get, UseGuards } from '@nestjs/common';
import { DevicesService } from '../../application/services/devices.service';
import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('rank-tracker/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiBearerAuth('user-auth')
  @Get()
  @UseGuards(AuthGuard)
  getAllAvailableForUserDevices() {
    return this.devicesService.getAllAvailableForUserDevices();
  }

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    deprecated: true,
  })
  @Get('all')
  @UseGuards(AuthGuard)
  getAllDevices() {
    return this.devicesService.getAllDevices();
  }
}
