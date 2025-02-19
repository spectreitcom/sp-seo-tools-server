import { Injectable } from '@nestjs/common';
import { AddDomainDto } from '../dto/add-domain.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddDomainCommand } from '../commands/add-domain.command';
import { GetUserDomainsListQuery } from '../queries/get-user-domains-list.query';
import { GetUserDomainsListQueryResponse } from '../query-handlers/get-user-domains-list.query-handler';

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

  getUserDomainsList(userId: string, page: number, searchText: string) {
    return this.queryBus.execute<
      GetUserDomainsListQuery,
      GetUserDomainsListQueryResponse
    >(new GetUserDomainsListQuery(page, searchText, userId));
  }
}
