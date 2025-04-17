import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../application/guards/auth.guard';
import { DevicesService } from '../../application/services/devices.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllDevicesQueryResponseItemSwagger } from '../../application/swagger/get-all-devices-query-response-item.swagger';

@Controller('serp-analyzer/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiBearerAuth('user-auth')
  @ApiOperation({
    description: 'Returns all devices',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetAllDevicesQueryResponseItemSwagger,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  getAllDevices() {
    return this.devicesService.getAllDevices();
  }
}
