import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserKeywordsListQuery } from '../queries/get-user-keywords-list.query';
import { CollectionData } from '../../../shared/types/collection.data';
import { UserKeywordsListItemDto } from '../dto/user-keywords-list-item.dto';
import { Device } from '../../domain/value-objects/device';
import { UserKeywordsListRepository } from '../ports/user-keywords-list.repository';
import { BadRequestException } from '@nestjs/common';

export type GetUserKeywordsListQueryResponse =
  CollectionData<UserKeywordsListItemDto>;

@QueryHandler(GetUserKeywordsListQuery)
export class GetUserKeywordsListQueryHandler
  implements
    IQueryHandler<GetUserKeywordsListQuery, GetUserKeywordsListQueryResponse>
{
  constructor(
    private readonly userKeywordsListRepository: UserKeywordsListRepository,
  ) {}

  async execute(
    query: GetUserKeywordsListQuery,
  ): Promise<GetUserKeywordsListQueryResponse> {
    const { domainId, page, localizationId, searchText, device, userId, take } =
      query;
    const _device = new Device(device);

    if (device && !_device.isValid()) {
      throw new BadRequestException('Invalid device');
    }

    const deviceFilterValue = device ? _device.value : undefined;
    const domainIdFilterValue = domainId ? domainId : undefined;

    // todo;
    // const take = 30;

    const skip = (page - 1) * take;

    const data = await this.userKeywordsListRepository.findAllUserKeywords(
      userId,
      take,
      skip,
      searchText,
      localizationId,
      deviceFilterValue,
      domainIdFilterValue,
    );

    const total =
      await this.userKeywordsListRepository.countAllWithSearchParams(
        userId,
        searchText,
        localizationId,
        deviceFilterValue,
        domainIdFilterValue,
      );

    const userTotal =
      await this.userKeywordsListRepository.countAllForUser(userId);

    return {
      data,
      total,
      userTotal,
    };
  }
}
