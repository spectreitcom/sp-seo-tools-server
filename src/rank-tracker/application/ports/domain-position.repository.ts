import { DomainPosition } from '../../domain/domain-position';
import { PrismaClient } from '@prisma/client';

export abstract class DomainPositionRepository {
  abstract save(
    domainPosition: DomainPosition,
    prisma?: PrismaClient,
  ): Promise<void>;
}
