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
    const {
      domainId,
      page,
      localizationId,
      searchEngineId,
      searchText,
      device,
      userId,
    } = query;
    const _device = new Device(device);

    if (!_device.isValid()) {
      throw new BadRequestException('Invalid device');
    }

    const take = 30;

    const skip = (page - 1) * take;

    const data = await this.userKeywordsListRepository.findAllUserKeywords(
      userId,
      take,
      skip,
      searchText,
      localizationId,
      searchEngineId,
      _device.value,
      domainId,
    );

    const total = await this.userKeywordsListRepository.countAllUserKeywords(
      userId,
      searchText,
      localizationId,
      searchEngineId,
      _device.value,
      domainId,
    );

    return {
      data,
      total,
    };
  }
}
