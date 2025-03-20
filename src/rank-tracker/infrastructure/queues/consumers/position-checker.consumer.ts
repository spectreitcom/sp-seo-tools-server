import { Processor, WorkerHost } from '@nestjs/bullmq';
import { POSITION_CHECKER_QUEUE } from '../constants';
import { KeywordRepository } from '../../../application/ports/keyword.repository';
import { DomainRepository } from '../../../application/ports/domain.repository';
import { LocalizationRepository } from '../../../application/ports/localization.repository';
import { UserSubscriptionInfoRepository } from '../../../application/ports/user-subscription-info.repository';
import { DomainPositionRepository } from '../../../application/ports/domain-position.repository';
import { GoogleScraperFacade } from '../../../../google-scraper/application/google-scraper.facade';
import { TestingModeRepository } from '../../../application/ports/testing-mode.repository';
import { DomainPositionFactory } from '../../../domain/factories/domain-position.factory';
import { Device } from '../../../domain/value-objects/device';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../../application/constants';
import { EventPublisher } from '@nestjs/cqrs';
import { sleep } from '../../../../shared/utils';

const TAKE = 100;

@Processor(POSITION_CHECKER_QUEUE)
export class PositionCheckerConsumer extends WorkerHost {
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly domainRepository: DomainRepository,
    private readonly localizationRepository: LocalizationRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly domainPositionRepository: DomainPositionRepository,
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    super();
  }

  async process(): Promise<void> {
    let skip = 0;

    let keywords = await this.keywordRepository.findAll(TAKE, skip);

    while (!!keywords.length) {
      for (const keyword of keywords) {
        await sleep(5000);

        const domain = await this.domainRepository.findById(
          keyword.getDomainId(),
        );

        const localization = await this.localizationRepository.findById(
          keyword.getLocalizationId(),
        );

        const userSubscriptionInfo =
          await this.userSubscriptionInfoRepository.findByUser(domain.userId);

        const testingMode = await this.testingModeRepository.findByUserId(
          domain.userId,
        );

        if (testingMode && testingMode.getActive()) {
          try {
            const { response_id } = await this.googleScraperFacade.sendQuery(
              localization.countryCode,
              testingMode.getMaxSearchedPages() * 10 + 1,
              keyword.getKeywordText(),
              this.mapDeviceToGoogleScraperDevice(keyword.getDevice()),
            );
            await this.createDomainPosition(
              keyword.getKeywordId(),
              response_id,
            );
          } catch (error) {
            console.error('send query error', error);
          }
        }

        if (userSubscriptionInfo && userSubscriptionInfo.getActive()) {
          const { response_id } = await this.googleScraperFacade.sendQuery(
            localization.countryCode,
            userSubscriptionInfo.getMaxSearchedPages() * 10 + 1,
            keyword.getKeywordText(),
            this.mapDeviceToGoogleScraperDevice(keyword.getDevice()),
          );

          await this.createDomainPosition(keyword.getKeywordId(), response_id);
        }
      }

      skip = TAKE * (skip + 1);
      keywords = await this.keywordRepository.findAll(TAKE, skip);
    }
  }

  private async createDomainPosition(keywordId: string, processId: string) {
    const domainPosition = DomainPositionFactory.create(keywordId, processId);
    this.eventPublisher.mergeObjectContext(domainPosition);
    domainPosition.create();
    await this.domainPositionRepository.save(domainPosition);
    domainPosition.commit();
  }

  private mapDeviceToGoogleScraperDevice(device: Device) {
    switch (device.value) {
      case DESKTOP_DEVICE:
        return 'desktop';
      case MOBILE_DEVICE:
        return 'mobile';
      case TABLET_DEVICE:
        return 'tablet';
    }
  }
}
