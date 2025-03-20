import { Keyword } from '../../domain/keyword';
import { PrismaClient } from '@prisma/client';

export abstract class KeywordRepository {
  abstract save(keyword: Keyword, prisma?: PrismaClient): Promise<void>;
  abstract findById(
    keywordId: string,
    userId: string,
    prisma?: PrismaClient,
  ): Promise<Keyword>;

  abstract getUsedKeywordsQty(
    userId: string,
    prisma?: PrismaClient,
  ): Promise<number>;

  abstract findAll(
    take: number,
    skip: number,
    prisma?: PrismaClient,
  ): Promise<Keyword[]>;

  abstract isOwnerOf(
    userId: string,
    keywordId: string,
    prisma?: PrismaClient,
  ): Promise<boolean>;

  abstract delete(keywordId: string, prisma?: PrismaClient): Promise<void>;

  abstract findByText(text: string, prisma?: PrismaClient): Promise<Keyword[]>;

  abstract findAllWithIds(keywordIds: string[]): Promise<Keyword[]>;
}
