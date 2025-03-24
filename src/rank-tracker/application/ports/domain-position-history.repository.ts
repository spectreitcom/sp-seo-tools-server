import { DomainPositionHistoryDto } from '../dto/domain-position-history.dto';

export abstract class DomainPositionHistoryRepository {
  abstract findAll(
    keywordId: string,
    userId: string,
    skip: number,
    take: number,
    fromDate: number,
    toDate: number,
  ): Promise<DomainPositionHistoryDto[]>;

  abstract countAllWithSearchParams(
    keywordId: string,
    userId: string,
    fromDate: number,
    toDate: number,
  ): Promise<number>;

  abstract countAllForUser(keywordId: string, userId: string): Promise<number>;
}
