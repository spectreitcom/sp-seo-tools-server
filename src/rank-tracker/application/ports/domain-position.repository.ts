import { DomainPosition } from '../../domain/domain-position';
import { PrismaClient, RtDomainPositionStaus } from '@prisma/client';

export abstract class DomainPositionRepository {
  abstract save(
    domainPosition: DomainPosition,
    prisma?: PrismaClient,
  ): Promise<void>;

  abstract findAll(
    take: number,
    skip: number,
    status: RtDomainPositionStaus | undefined,
  ): Promise<DomainPosition[]>;

  abstract findAllByKeywordK(
    keywordId: string,
    take: number,
    skip: number,
    status: RtDomainPositionStaus | undefined,
  ): Promise<DomainPosition[]>;

  abstract findAllNoneZeroPositionByKeywordK(
    keywordId: string,
    take: number,
    skip: number,
    status: RtDomainPositionStaus | undefined,
  ): Promise<DomainPosition[]>;
}
