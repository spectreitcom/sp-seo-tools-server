import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { Keyword } from '../../../domain/keyword';
import { DatabaseService } from '../../../../database/database.service';
import { KeywordMapper } from '../../../domain/mappers/keyword.mapper';

export class PrismaKeywordRepository implements KeywordRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(keyword: Keyword): Promise<void> {
    const keywordEntity = await this.databaseService.rtKeyword.findFirst({
      where: {
        id: keyword.getKeywordId(),
      },
    });

    if (keywordEntity) {
      await this.update(keyword);
      return;
    }

    await this.create(keyword);
  }

  async findById(keywordId: string, userId: string): Promise<Keyword> {
    const rtKeyword = await this.databaseService.rtKeyword.findFirst({
      where: { id: keywordId },
      include: {
        domain: true,
      },
    });

    if (!rtKeyword) return null;

    const rtUserSubscriptionInfo =
      await this.databaseService.rtUserSubscriptionInfo.findFirst({
        where: {
          userId,
        },
      });

    const usedKeywordsQty = await this.databaseService.rtKeyword.count({
      where: {
        domain: {
          userId,
        },
      },
    });

    const rtTestingMode = await this.databaseService.rtTestingMode.findUnique({
      where: { userId },
    });

    return KeywordMapper.toDomain(
      rtKeyword,
      rtUserSubscriptionInfo,
      usedKeywordsQty,
      rtTestingMode,
    );
  }

  async getUsedKeywordsQty(userId: string): Promise<number> {
    return this.databaseService.rtKeyword.count({
      where: {
        domain: {
          userId: userId,
        },
      },
    });
  }

  private async update(keyword: Keyword) {
    this.databaseService.rtKeyword.update({
      where: { id: keyword.getKeywordId() },
      data: {
        text: keyword.getKeywordText(),
        domainId: keyword.getDomainId(),
      },
    });
  }

  private async create(keyword: Keyword) {
    this.databaseService.rtKeyword.create({
      data: {
        id: keyword.getKeywordId(),
        text: keyword.getKeywordText(),
        domainId: keyword.getDomainId(),
        searchEngineId: keyword.getSearchEngineId(),
        device: keyword.getDevice().value,
        localizationId: keyword.getLocalizationId(),
      },
    });
  }

  async findAll(take: number, skip: number): Promise<Keyword[]> {
    const keywordModels = await this.databaseService.rtKeyword.findMany({
      take,
      skip,
    });

    const keywords: Keyword[] = [];

    for (const keywordModel of keywordModels) {
      const domainModel = await this.databaseService.rtDomain.findUnique({
        where: {
          id: keywordModel.domainId,
        },
      });

      const userSubscriptionInfoModel =
        await this.databaseService.rtUserSubscriptionInfo.findFirst({
          where: {
            userId: domainModel.userId,
          },
        });

      const usedKeywordsQty = await this.getUsedKeywordsQty(domainModel.userId);

      const rtTestingMode = await this.databaseService.rtTestingMode.findUnique(
        {
          where: { userId: domainModel.userId },
        },
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

  async isOwnerOf(userId: string, keywordId: string): Promise<boolean> {
    const keywordModel = await this.databaseService.rtKeyword.findUnique({
      where: {
        id: keywordId,
        domain: {
          userId,
        },
      },
    });
    return !!keywordModel;
  }

  async delete(keywordId: string): Promise<void> {
    await this.databaseService.rtKeyword.delete({
      where: { id: keywordId },
    });
  }
}
