import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserKeywordQuery } from '../queries/get-user-keyword.query';
import { UserKeywordsListItemDto } from '../dto/user-keywords-list-item.dto';
import { UserKeywordsListRepository } from '../ports/user-keywords-list.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserKeywordQuery)
export class GetUserKeywordQueryHandler
  implements IQueryHandler<GetUserKeywordQuery, UserKeywordsListItemDto>
{
  constructor(
    private readonly userKeywordsListRepository: UserKeywordsListRepository,
  ) {}

  async execute(query: GetUserKeywordQuery): Promise<UserKeywordsListItemDto> {
    const { userId, keywordId } = query;

    const userKeyword = await this.userKeywordsListRepository.findById(
      userId,
      keywordId,
    );

    if (!userKeyword) {
      throw new NotFoundException('Keyword not found');
    }
    return userKeyword;
  }
}
