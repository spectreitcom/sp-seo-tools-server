import { Domain } from '../../domain/domain';
import { PrismaClient } from '@prisma/client';

export abstract class DomainRepository {
  abstract save(domain: Domain, prisma?: PrismaClient): Promise<void>;

  abstract findById(domainId: string, prisma?: PrismaClient): Promise<Domain>;

  abstract domainExists(
    domainText: string,
    userId: string,
    prisma?: PrismaClient,
  ): Promise<boolean>;

  abstract remove(domainId: string, prisma?: PrismaClient): Promise<void>;

  abstract findByText(text: string, prisma?: PrismaClient): Promise<Domain[]>;

  abstract findAllWithIds(domainIds: string[]): Promise<Domain[]>;
}
