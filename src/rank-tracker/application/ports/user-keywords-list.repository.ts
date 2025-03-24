import { UserKeywordsListItemDto } from '../dto/user-keywords-list-item.dto';

export abstract class UserKeywordsListRepository {
  abstract findAllUserKeywords(
    userId: string,
    take: number,
    skip: number,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    device: string | undefined,
    domainId: string | null | undefined,
  ): Promise<UserKeywordsListItemDto[]>;

  abstract countAllWithSearchParams(
    userId: string,
    searchText: string | null | undefined,
    localizationId: string | null | undefined,
    device: string | undefined,
    domainId: string | null | undefined,
  ): Promise<number>;

  abstract countAllForUser(userId: string): Promise<number>;

  abstract findById(
    userId: string,
    keywordId: string,
  ): Promise<UserKeywordsListItemDto | null>;
}
