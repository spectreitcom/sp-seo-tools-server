import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { Keyword } from '../../../domain/keyword';
import { DatabaseService } from '../../../../database/database.service';
import { KeywordMapper } from '../../../domain/mappers/keyword.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaKeywordRepository implements KeywordRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(keyword: Keyword, prisma?: PrismaClient): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;

    const keywordEntity = await prismaClient.rtKeyword.findUnique({
      where: {
        id: keyword.getKeywordId(),
      },
    });

    if (keywordEntity) {
      await this.update(keyword);
      return;
    }

    await this.create(keyword, prisma);
  }

  async findById(
    keywordId: string,
    userId: string,
    prisma?: PrismaClient,
  ): Promise<Keyword> {
    const prismaClient = prisma ?? this.databaseService;
    const rtKeyword = await prismaClient.rtKeyword.findFirst({
      where: { id: keywordId },
      include: {
        domain: true,
      },
    });

    if (!rtKeyword) return null;

    const rtUserSubscriptionInfo =
      await prismaClient.rtUserSubscriptionInfo.findFirst({
        where: {
          userId,
        },
      });

    const usedKeywordsQty = await prismaClient.rtKeyword.count({
      where: {
        domain: {
          userId,
        },
      },
    });

    const rtTestingMode = await prismaClient.rtTestingMode.findUnique({
      where: { userId },
    });

    return KeywordMapper.toDomain(
      rtKeyword,
      rtUserSubscriptionInfo,
      usedKeywordsQty,
      rtTestingMode,
    );
  }

  async getUsedKeywordsQty(
    userId: string,
    prisma?: PrismaClient,
  ): Promise<number> {
    const prismaClient = prisma ?? this.databaseService;
    return prismaClient.rtKeyword.count({
      where: {
        domain: {
          userId: userId,
        },
      },
    });
  }

  private async update(keyword: Keyword, prisma?: PrismaClient) {
    const prismaClient = prisma ?? this.databaseService;
    prismaClient.rtKeyword.update({
      where: { id: keyword.getKeywordId() },
      data: {
        text: keyword.getKeywordText(),
        domainId: keyword.getDomainId(),
        device: keyword.getDevice().value,
        localizationId: keyword.getLocalizationId(),
      },
    });
  }

  private async create(keyword: Keyword, prisma?: PrismaClient) {
    const prismaClient = prisma ?? this.databaseService;
    await prismaClient.rtKeyword.create({
      data: {
        id: keyword.getKeywordId(),
        text: keyword.getKeywordText(),
        domainId: keyword.getDomainId(),
        device: keyword.getDevice().value,
        localizationId: keyword.getLocalizationId(),
        timestamp: keyword.getTimestamp(),
      },
    });
  }

  async findAll(
    take: number,
    skip: number,
    prisma?: PrismaClient,
  ): Promise<Keyword[]> {
    const prismaClient = prisma ?? this.databaseService;

    const keywordModels = await prismaClient.rtKeyword.findMany({
      take,
      skip,
    });

    const domainModels = await prismaClient.rtDomain.findMany({
      where: {
        id: {
          in: keywordModels.map((keywordModel) => keywordModel.domainId),
        },
      },
    });

    const userIds: string[] = [];

    for (const domainModel of domainModels) {
      if (!userIds.includes(domainModel.userId)) {
        userIds.push(domainModel.userId);
      }
    }

    const userSubscriptionInfoModels =
      await prismaClient.rtUserSubscriptionInfo.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });

    const rtTestingModes = await prismaClient.rtTestingMode.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    });

    const keywords: Keyword[] = [];

    for (const keywordModel of keywordModels) {
      const domainModel = domainModels.find(
        (dm) => dm.id === keywordModel.domainId,
      );

      const userSubscriptionInfoModel = userSubscriptionInfoModels.find(
        (us) => us.userId === domainModel.userId,
      );

      // For now, I am not sure how to do it better
      const usedKeywordsQty = await this.getUsedKeywordsQty(
        domainModel.userId,
        prismaClient,
      );

      const rtTestingMode = rtTestingModes.find(
        (tm) => tm.userId === domainModel.userId,
      );

      const keyword = KeywordMapper.toDomain(
        keywordModel,
        userSubscriptionInfoModel,
        usedKeywordsQty,
        rtTestingMode,
      );
      keywords.push(keyword);
    }

    return keywords;
  }

  async isOwnerOf(
    userId: string,
    keywordId: string,
    prisma?: PrismaClient,
  ): Promise<boolean> {
    const prismaClient = prisma ?? this.databaseService;
    const keywordModel = await prismaClient.rtKeyword.findUnique({
      where: {
        id: keywordId,
        domain: {
          userId,
        },
      },
    });
    return !!keywordModel;
  }

  async delete(keywordId: string, prisma?: PrismaClient): Promise<void> {
    const prismaClient = prisma ?? this.databaseService;
    await prismaClient.rtKeyword.delete({
      where: { id: keywordId },
    });
  }

  async findByText(text: string, prisma?: PrismaClient): Promise<Keyword[]> {
    const prismaClient = prisma ?? this.databaseService;
    const models = await prismaClient.rtKeyword.findMany({
      where: {
        text,
      },
    });

    if (!models.length) return [];

    const domainModels = await prismaClient.rtDomain.findMany({
      where: {
        id: {
          in: models.map((keywordModel) => keywordModel.domainId),
        },
      },
    });

    const userIds: string[] = [];

    for (const domainModel of domainModels) {
      if (!userIds.includes(domainModel.userId)) {
        userIds.push(domainModel.userId);
      }
    }

    const userSubscriptionInfoModels =
      await prismaClient.rtUserSubscriptionInfo.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });

    const rtTestingModes = await prismaClient.rtTestingMode.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    });

    const keywords: Keyword[] = [];

    for (const model of models) {
      const domainModel = domainModels.find((dm) => dm.id === model.domainId);

      const userSubscriptionInfoModel = userSubscriptionInfoModels.find(
        (us) => us.userId === domainModel.userId,
      );

      // For now, I am not sure how to do it better
      const usedKeywordsQty = await this.getUsedKeywordsQty(
        domainModel.userId,
        prismaClient,
      );

      const rtTestingMode = rtTestingModes.find(
        (tm) => tm.userId === domainModel.userId,
      );

      keywords.push(
        KeywordMapper.toDomain(
          model,
          userSubscriptionInfoModel,
          usedKeywordsQty,
          rtTestingMode,
        ),
      );
    }

    return keywords;
  }

  async findAllWithIds(keywordIds: string[]): Promise<Keyword[]> {
    const models = await this.databaseService.rtKeyword.findMany({
      where: {
        id: {
          in: keywordIds,
        },
      },
    });

    if (!models.length) return [];

    const domainModels = await this.databaseService.rtDomain.findMany({
      where: {
        id: {
          in: models.map((keywordModel) => keywordModel.domainId),
        },
      },
    });

    const userIds: string[] = [];

    for (const domainModel of domainModels) {
      if (!userIds.includes(domainModel.userId)) {
        userIds.push(domainModel.userId);
      }
    }

    const userSubscriptionInfoModels =
      await this.databaseService.rtUserSubscriptionInfo.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });

    const rtTestingModes = await this.databaseService.rtTestingMode.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    });

    const keywords: Keyword[] = [];

    for (const model of models) {
      const domainModel = domainModels.find((dm) => dm.id === model.domainId);

      const userSubscriptionInfoModel = userSubscriptionInfoModels.find(
        (us) => us.userId === domainModel.userId,
      );

      // For now, I am not sure how to do it better
      const usedKeywordsQty = await this.getUsedKeywordsQty(domainModel.userId);

      const rtTestingMode = rtTestingModes.find(
        (tm) => tm.userId === domainModel.userId,
      );

      keywords.push(
        KeywordMapper.toDomain(
          model,
          userSubscriptionInfoModel,
          usedKeywordsQty,
          rtTestingMode,
        ),
      );
    }
    return keywords;
  }
}
