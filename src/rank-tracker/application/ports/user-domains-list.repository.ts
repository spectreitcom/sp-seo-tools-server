import { UserDomainsListItemDto } from '../dto/user-domains-list-item.dto';

export abstract class UserDomainsListRepository {
  abstract findAll(
    userId: string,
    take: number,
    skip: number,
    searchText: string | null | undefined,
  ): Promise<UserDomainsListItemDto[]>;
  abstract countAllWithSearchParams(
    userId: string,
    searchText: string | null | undefined,
  ): Promise<number>;
  abstract countAllForUser(userId: string): Promise<number>;
  abstract findById(
    userId: string,
    domainId: string,
  ): Promise<UserDomainsListItemDto | null>;
}
