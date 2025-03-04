import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserKeywordsListQuery } from '../queries/get-user-keywords-list.query';
import { GetUserKeywordsListQueryResponse } from '../query-handlers/get-user-keywords-list.query-handler';
import { DeleteKeywordCommand } from '../commands/delete-keyword.command';
import { AddKeywordDto } from '../dto/add-keyword.dto';
import { AddKeywordCommand } from '../commands/add-keyword.command';

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
        payload.searchEngineId,
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
    searchEngineId: string | null | undefined,
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
        searchEngineId,
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
}
