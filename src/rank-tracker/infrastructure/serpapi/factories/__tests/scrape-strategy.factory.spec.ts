import { ScrapeStrategyFactory } from '../scrape-strategy.factory';
import { GoogleStrategy } from '../../strategies/google.strategy';
import { YandexStrategy } from '../../strategies/yandex.strategy';
import { YahooStrategy } from '../../strategies/yahoo.strategy';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import {
  GOOGLE_ENGINE_KEY,
  YAHOO_ENGINE_KEY,
  YANDEX_ENGINE_KEY,
} from '../../constants';
import { NotFoundEngineKey } from '../../exceptions';

describe('ScrapeStrategyFactory', () => {
  let configService: ConfigService;
  let http: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    http = module.get<HttpService>(HttpService);
  });

  describe('get', () => {
    it('should return strategy', () => {
      expect(
        ScrapeStrategyFactory.get(GOOGLE_ENGINE_KEY, configService, http),
      ).toBeInstanceOf(GoogleStrategy);
      expect(
        ScrapeStrategyFactory.get(YANDEX_ENGINE_KEY, configService, http),
      ).toBeInstanceOf(YandexStrategy);
      expect(
        ScrapeStrategyFactory.get(YAHOO_ENGINE_KEY, configService, http),
      ).toBeInstanceOf(YahooStrategy);
    });
    it('should throw an error when engine key is not defined', () => {
      expect(() =>
        ScrapeStrategyFactory.get('BAD_ENGINE_KEY', configService, http),
      ).toThrow(NotFoundEngineKey);
    });
  });
});
