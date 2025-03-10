import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserKeywordsListQuery } from '../queries/get-user-keywords-list.query';
import { GetUserKeywordsListQueryResponse } from '../query-handlers/get-user-keywords-list.query-handler';
import { DeleteKeywordCommand } from '../commands/delete-keyword.command';
import { AddKeywordDto } from '../dto/add-keyword.dto';
import { AddKeywordCommand } from '../commands/add-keyword.command';
import { GetUserKeywordQuery } from '../queries/get-user-keyword.query';
import { UserKeywordsListItemDto } from '../dto/user-keywords-list-item.dto';

@Injectable()
export class KeywordService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  addKeyword(userId: string, payload: AddKeywordDto) {
    return this.commandBus.execute<AddKeywordCommand, void>(
      new AddKeywordCommand(
        payload.domainId,
        payload.text,
        userId,
        payload.device,
        payload.localizationId,
      ),
    );
  }

  async getUserKeywordsList(
    userId: string,
    page: number,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    device: string | null | undefined,
    domainId: string | null | undefined,
  ) {
    return this.queryBus.execute<
      GetUserKeywordsListQuery,
      GetUserKeywordsListQueryResponse
    >(
      new GetUserKeywordsListQuery(
        searchText,
        localizationId,
        device,
        domainId,
        userId,
        page,
      ),
    );
  }

  async delete(keywordId: string, userId: string) {
    return this.commandBus.execute<DeleteKeywordCommand, void>(
      new DeleteKeywordCommand(userId, keywordId),
    );
  }

  async getUserKeyword(keywordId: string, userId: string) {
    return this.queryBus.execute<GetUserKeywordQuery, UserKeywordsListItemDto>(
      new GetUserKeywordQuery(userId, keywordId),
    );
  }
}
