import { ScrapeStrategy } from '../strategies/scrape-strategy';
import { GoogleStrategy } from '../strategies/google.strategy';
import { YahooStrategy } from '../strategies/yahoo.strategy';
import { YandexStrategy } from '../strategies/yandex.strategy';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  GOOGLE_ENGINE_KEY,
  YAHOO_ENGINE_KEY,
  YANDEX_ENGINE_KEY,
} from '../../../application/constants';
import { NotFoundEngineKey } from '../exceptions';

export class ScrapeStrategyFactory {
  static get(
    searchEngineKey: string,
    configService: ConfigService,
    http: HttpService,
  ): ScrapeStrategy {
    switch (searchEngineKey) {
      case GOOGLE_ENGINE_KEY:
        return new GoogleStrategy(configService, http);
      case YAHOO_ENGINE_KEY:
        return new YahooStrategy(configService, http);
      case YANDEX_ENGINE_KEY:
        return new YandexStrategy(configService, http);
      default:
        throw new NotFoundEngineKey();
    }
  }
}
