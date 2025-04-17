import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllDevicesQuery } from '../queries/get-all-devices.query';
import { GetAllDevicesQueryResponse } from '../query-handlers/get-all-devices.query-handler';

@Injectable()
export class DevicesService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllDevices() {
    return this.queryBus.execute<
      GetAllDevicesQuery,
      GetAllDevicesQueryResponse
    >(new GetAllDevicesQuery());
  }
}
