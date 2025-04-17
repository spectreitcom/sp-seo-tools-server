import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllDevicesQuery } from '../queries/get-all-devices.query';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../domain/constants';

export type GetAllDevicesQueryResponse = { label: string; value: string }[];

@QueryHandler(GetAllDevicesQuery)
export class GetAllDevicesQueryHandler
  implements IQueryHandler<GetAllDevicesQuery, GetAllDevicesQueryResponse>
{
  async execute(): Promise<GetAllDevicesQueryResponse> {
    return [
      {
        label: 'Desktop',
        value: DESKTOP_DEVICE,
      },
      {
        label: 'Tablet',
        value: TABLET_DEVICE,
      },
      {
        label: 'Mobile',
        value: MOBILE_DEVICE,
      },
    ];
  }
}
