import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAvailableForUserDevicesQuery } from '../queries/get-all-available-for-user-devices.query';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from '../constants';

export type GetAllAvailableForUserDevicesQueryResponse = {
  label: string;
  value: string;
}[];

@QueryHandler(GetAllAvailableForUserDevicesQuery)
export class GetAllAvailableForUserDevicesQueryHandler
  implements
    IQueryHandler<
      GetAllAvailableForUserDevicesQuery,
      GetAllAvailableForUserDevicesQueryResponse
    >
{
  async execute(
    _: GetAllAvailableForUserDevicesQuery,
  ): Promise<GetAllAvailableForUserDevicesQueryResponse> {
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
