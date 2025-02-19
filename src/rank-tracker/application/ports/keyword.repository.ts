import { Keyword } from '../../domain/keyword';

export abstract class KeywordRepository {
  abstract save(keyword: Keyword): Promise<void>;
  abstract findById(keywordId: string, userId: string): Promise<Keyword>;
  abstract getUsedKeywordsQty(userId: string): Promise<number>;
  abstract findAll(take: number, skip: number): Promise<Keyword[]>;
  abstract isOwnerOf(userId: string, keywordId: string): Promise<boolean>;
  abstract delete(keywordId: string): Promise<void>;
}
