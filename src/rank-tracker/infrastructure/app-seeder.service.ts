import { Injectable } from '@nestjs/common';
import { SeederService } from '../application/ports/seeder.service';
import { Localization } from '../domain/localization';
import { LocalizationFactory } from '../domain/factories/localization.factory';
import { DomainFactory } from '../domain/factories/domain.factory';
import { Domain } from '../domain/domain';
import { KeywordFactory } from '../domain/factories/keyword.factory';
import { DESKTOP_DEVICE } from '../application/constants';
import { Keyword } from '../domain/keyword';
import * as moment from 'moment/moment';
import { randomNumberFromRange } from '../../shared/utils';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { DomainRepository } from '../application/ports/domain.repository';
import { KeywordRepository } from '../application/ports/keyword.repository';
import { DomainPositionRepository } from '../application/ports/domain-position.repository';
import { DatabaseService } from '../../database/database.service';
import { PrismaClient } from '@prisma/client';
import { DomainPositionFactory } from '../domain/factories/domain-position.factory';
import { randomUUID } from 'crypto';

@Injectable()
export class AppSeederService implements SeederService {
  constructor(
    private readonly localizationRepository: LocalizationRepository,
    private readonly domainRepository: DomainRepository,
    private readonly keywordRepository: KeywordRepository,
    private readonly domainPositionRepository: DomainPositionRepository,
    private readonly databaseService: DatabaseService,
  ) {}

  async seed(userId: string): Promise<void> {
    await this.databaseService.$transaction(async (prisma) => {
      const localizationIds = await this.seedLocalizations(
        prisma as PrismaClient,
      );

      const domainIds = await this.seedDomains(userId, prisma as PrismaClient);

      let keywordIds: string[] = [];

      for (const domainId of domainIds) {
        for (const localizationId of localizationIds) {
          const _keywordIds = await this.seedKeywords(
            domainId,
            localizationId,
            prisma as PrismaClient,
          );
          keywordIds = [...keywordIds, ..._keywordIds];
        }
      }

      for (const keywordId of keywordIds) {
        await this.seedDomainPositions(keywordId, prisma as PrismaClient);
      }
    });
  }

  private async seedLocalizations(prisma: PrismaClient) {
    const localizationsToCreate: Localization[] = [
      LocalizationFactory.create('google.pl', 'pl', 'Poland'),
    ];

    const localizationsCreated: Localization[] = [];

    for (const localization of localizationsToCreate) {
      const existingLocalization =
        await this.localizationRepository.findByCountryCode(
          localization.countryCode,
          prisma,
        );
      if (!existingLocalization) {
        await this.localizationRepository.save(localization, prisma);
        localizationsCreated.push(localization);
      } else {
        localizationsCreated.push(existingLocalization);
      }
    }

    return localizationsCreated.map(
      (localization) => localization.localizationId,
    );
  }

  private async seedDomains(
    userId: string,
    prisma: PrismaClient,
  ): Promise<string[]> {
    const domainsToCreate = [DomainFactory.create('example.com', userId)];
    const domainsCreated: Domain[] = [];
    for (const domain of domainsToCreate) {
      const foundDomains = await this.domainRepository.findByText(
        domain.text,
        prisma,
      );
      if (!foundDomains.length) {
        await this.domainRepository.save(domain, prisma);
        domainsCreated.push(domain);
      } else {
        domainsCreated.push(...foundDomains);
      }
    }
    return domainsCreated.map((domain) => domain.domainId);
  }

  private async seedKeywords(
    domainId: string,
    localizationId: string,
    prisma: PrismaClient,
  ): Promise<string[]> {
    const keywordToCreate = [
      KeywordFactory.create(
        true,
        0,
        1000,
        domainId,
        'test keyword 1',
        DESKTOP_DEVICE,
        localizationId,
        false,
      ),
    ];

    const keywordsCreated: Keyword[] = [];

    for (const keyword of keywordToCreate) {
      const foundKeywords = await this.keywordRepository.findByText(
        keyword.getKeywordText(),
        prisma,
      );
      if (!foundKeywords.length) {
        await this.keywordRepository.save(keyword, prisma);
        keywordsCreated.push(keyword);
      } else {
        keywordsCreated.push(...foundKeywords);
      }
    }
    return keywordsCreated.map((keyword) => keyword.getKeywordId());
  }

  private async seedDomainPositions(keywordId: string, prisma: PrismaClient) {
    const maxDateMoment = moment();
    const minDateMoment = maxDateMoment.clone().subtract(6, 'months');

    let nextDate = minDateMoment.clone();

    while (nextDate.isSameOrBefore(maxDateMoment, 'day')) {
      const timestamp = nextDate.unix();
      const position = randomNumberFromRange(0, 50);
      const domainPosition = DomainPositionFactory.create(
        keywordId,
        randomUUID(),
        timestamp,
        position,
        'DONE',
      );
      await this.domainPositionRepository.save(domainPosition, prisma);
      nextDate = nextDate.clone().add(1, 'day');
    }
  }
}
