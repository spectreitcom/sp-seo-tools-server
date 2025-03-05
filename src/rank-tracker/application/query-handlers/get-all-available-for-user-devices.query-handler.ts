import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAvailableForUserDevicesQuery } from '../queries/get-all-available-for-user-devices.query';
import { TestingModeRepository } from '../ports/testing-mode.repository';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';
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
  constructor(
    private readonly testingModeRepository: TestingModeRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async execute(
    query: GetAllAvailableForUserDevicesQuery,
  ): Promise<GetAllAvailableForUserDevicesQueryResponse> {
    const { userId } = query;

    const testingMode = await this.testingModeRepository.findByUserId(userId);

    if (testingMode && testingMode.getActive()) {
      return [
        {
          label: 'Desktop',
          value: DESKTOP_DEVICE,
        },
      ];
    }

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (userSubscriptionInfo && userSubscriptionInfo.getActive()) {
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

    return [];
  }
}
