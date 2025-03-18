import { Domain } from 'src/rank-tracker/domain/domain';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../database/database.service';
import { DomainMapper } from '../../../domain/mappers/domain.mapper';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaDomainRepository implements DomainRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(domain: Domain, prisma?: PrismaClient): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;

    const rtDomain = await prismaClient.rtDomain.findFirst({
      where: { id: domain.domainId },
    });

    if (rtDomain) {
      await prismaClient.rtDomain.update({
        where: { id: domain.domainId },
        data: {
          text: domain.text,
        },
      });
      return;
    }

    await prismaClient.rtDomain.create({
      data: {
        id: domain.domainId,
        userId: domain.userId,
        text: domain.text,
        createdAt: domain.createdAt,
      },
    });
  }

  async findById(domainId: string, prisma?: PrismaClient): Promise<Domain> {
    const prismaClient = prisma ?? this.databaseService;
    const rtDomain = await prismaClient.rtDomain.findFirst({
      where: { id: domainId },
    });
    if (!rtDomain) return null;
    return DomainMapper.toDomain(rtDomain);
  }

  async domainExists(
    domainText: string,
    userId: string,
    prisma?: PrismaClient,
  ): Promise<boolean> {
    const prismaClient = prisma ?? this.databaseService;
    const rtDomain = await prismaClient.rtDomain.findFirst({
      where: {
        userId: userId,
        text: domainText,
      },
    });
    return !!rtDomain;
  }

  async remove(domainId: string, prisma?: PrismaClient): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;
    await prismaClient.rtDomain.delete({
      where: { id: domainId },
    });
  }

  async findByText(text: string, prisma?: PrismaClient): Promise<Domain[]> {
    const prismaClient = prisma ?? this.databaseService;
    const models = await prismaClient.rtDomain.findMany({
      where: { text },
    });
    if (!models.length) return [];
    return models.map((model) => DomainMapper.toDomain(model));
  }
}
