import { Injectable } from '@nestjs/common';
import { AddDomainDto } from '../dto/add-domain.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddDomainCommand } from '../commands/add-domain.command';
import { GetUserDomainsListQuery } from '../queries/get-user-domains-list.query';
import { GetUserDomainsListQueryResponse } from '../query-handlers/get-user-domains-list.query-handler';
import { DeleteDomainCommand } from '../commands/delete-domain.command';
import { GetUserDomainQuery } from '../queries/get-user-domain.query';
import { UserDomainsListItemDto } from '../dto/user-domains-list-item.dto';

@Injectable()
export class DomainService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  addDomain(payload: AddDomainDto, userId: string) {
    return this.commandBus.execute<AddDomainCommand, void>(
      new AddDomainCommand(payload.domain, userId),
    );
  }

  getUserDomainsList(
    userId: string,
    page: number,
    searchText: string,
    take: number,
  ) {
    return this.queryBus.execute<
      GetUserDomainsListQuery,
      GetUserDomainsListQueryResponse
    >(new GetUserDomainsListQuery(page, searchText, userId, take));
  }

  deleteDomain(domainId: string, userId: string) {
    return this.commandBus.execute<DeleteDomainCommand, void>(
      new DeleteDomainCommand(domainId, userId),
    );
  }

  getUserDomain(domainId: string, userId: string) {
    return this.queryBus.execute<GetUserDomainQuery, UserDomainsListItemDto>(
      new GetUserDomainQuery(domainId, userId),
    );
  }
}
