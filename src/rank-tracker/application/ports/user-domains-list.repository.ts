import { UserDomainsListItemDto } from '../dto/user-domains-list-item.dto';

export abstract class UserDomainsListRepository {
  abstract findAll(
    userId: string,
    take: number,
    skip: number,
    searchText: string | null | undefined,
  ): Promise<UserDomainsListItemDto[]>;
  abstract countAll(
    userId: string,
    searchText: string | null | undefined,
  ): Promise<number>;
  abstract countAllForUser(userId: string): Promise<number>;
}
