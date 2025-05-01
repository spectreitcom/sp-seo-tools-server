import { Injectable } from '@nestjs/common';
import { PositionCheckerService } from '../application/ports/position-checker.service';
import { Keyword } from '../domain/keyword';
import { DomainRepository } from '../application/ports/domain.repository';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { UserSubscriptionInfoRepository } from '../application/ports/user-subscription-info.repository';
import { TestingModeRepository } from '../application/ports/testing-mode.repository';
import { GoogleScraperFacade } from '../../google-scraper/application/google-scraper.facade';
import { DomainPositionFactory } from '../domain/factories/domain-position.factory';
import { Device } from '../domain/value-objects/device';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../application/constants';
import { DomainPositionRepository } from '../application/ports/domain-position.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable()
export class AppPositionCheckerService implements PositionCheckerService {
  constructor(
    private readonly domainRepository: DomainRepository,
    private readonly localizationRepository: LocalizationRepository,
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly testingModeRepository: TestingModeRepository,
    private readonly googleScraperFacade: GoogleScraperFacade,
    private readonly domainPositionRepository: DomainPositionRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async checkPosition(keyword: Keyword): Promise<void> {
    const domain = await this.domainRepository.findById(keyword.getDomainId());

    const localization = await this.localizationRepository.findById(
      keyword.getLocalizationId(),
    );

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(domain.userId);

    const testingMode = await this.testingModeRepository.findByUserId(
      domain.userId,
    );

    if (testingMode?.getActive()) {
      try {
        const { response_id } = await this.googleScraperFacade.sendQuery(
          localization.countryCode,
          testingMode.getMaxSearchedPages() * 10,
          keyword.getKeywordText(),
          this.mapDeviceToGoogleScraperDevice(keyword.getDevice()),
          testingMode.getUserId(),
        );
        await this.createDomainPosition(keyword.getKeywordId(), response_id);
      } catch (error) {
        this.errorHandlerService.logError(error, 'AppPositionCheckerService.checkPosition');
      }
    }

    if (userSubscriptionInfo?.getActive()) {
      const { response_id } = await this.googleScraperFacade.sendQuery(
        localization.countryCode,
        userSubscriptionInfo.getMaxSearchedPages() * 10 + 1,
        keyword.getKeywordText(),
        this.mapDeviceToGoogleScraperDevice(keyword.getDevice()),
        userSubscriptionInfo.getUserId(),
      );
      await this.createDomainPosition(keyword.getKeywordId(), response_id);
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
