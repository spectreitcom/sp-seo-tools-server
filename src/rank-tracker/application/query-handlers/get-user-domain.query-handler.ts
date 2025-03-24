import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDomainQuery } from '../queries/get-user-domain.query';
import { UserDomainsListItemDto } from '../dto/user-domains-list-item.dto';
import { UserDomainsListRepository } from '../ports/user-domains-list.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserDomainQuery)
export class GetUserDomainQueryHandler
  implements IQueryHandler<GetUserDomainQuery, UserDomainsListItemDto>
{
  constructor(
    private readonly userDomainsListRepository: UserDomainsListRepository,
  ) {}

  async execute(query: GetUserDomainQuery): Promise<UserDomainsListItemDto> {
    const { userId, domainId } = query;

    const userDomain = await this.userDomainsListRepository.findById(
      userId,
      domainId,
    );

    if (!userDomain) {
      throw new NotFoundException('Domain not found');
    }

    return userDomain;
  }
}
