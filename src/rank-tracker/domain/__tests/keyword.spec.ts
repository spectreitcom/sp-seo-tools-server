import { Keyword } from '../keyword';
import {
  InactiveSubscriptionError,
  InvalidDeviceError,
  IsKeywordsQuantityExceededError,
} from '../exceptions';
import { randomUUID } from 'crypto';
import { AvailableKeywordsQuantity } from '../value-objects/available-keywords-quantity';
import { Device } from '../value-objects/device';
import { DESKTOP_DEVICE } from '../../application/constants';

const DOMAIN_ID = randomUUID();
const KEYWORD_ID = randomUUID();
const SEARCH_ENGINE_ID = randomUUID();
const LOCALIZATION_ID = randomUUID();

describe('Keyword', () => {
  it('should add the new keyword when subscription is active and testing mode is inactive', () => {
    const keywordValue = 'test value';
    const device = new Device(DESKTOP_DEVICE);
    const keyword = new Keyword(
      true,
      new AvailableKeywordsQuantity(3, 10),
      KEYWORD_ID,
      DOMAIN_ID,
      keywordValue,
      SEARCH_ENGINE_ID,
      device,
      LOCALIZATION_ID,
      false,
    );

    keyword.create();

    expect(keyword.getKeywordText() === keywordValue).toBeTruthy();
    expect(keyword.getDevice().equals(device)).toBeTruthy();
    expect(keyword.getSearchEngineId() === SEARCH_ENGINE_ID).toBeTruthy();
  });

  it('should add the new keyword when subscription is inactive and testing mode is active', () => {
    const keywordValue = 'test value';
    const device = new Device(DESKTOP_DEVICE);
    const keyword = new Keyword(
      false,
      new AvailableKeywordsQuantity(3, 10),
      KEYWORD_ID,
      DOMAIN_ID,
      keywordValue,
      SEARCH_ENGINE_ID,
      device,
      LOCALIZATION_ID,
      true,
    );

    keyword.create();

    expect(keyword.getKeywordText() === keywordValue).toBeTruthy();
    expect(keyword.getDevice().equals(device)).toBeTruthy();
    expect(keyword.getSearchEngineId() === SEARCH_ENGINE_ID).toBeTruthy();
  });

  it('should not add the new keyword when subscription is inactive and testing mode is inactive', () => {
    const device = new Device(DESKTOP_DEVICE);
    const keyword = new Keyword(
      false,
      new AvailableKeywordsQuantity(3, 10),
      KEYWORD_ID,
      DOMAIN_ID,
      'test',
      SEARCH_ENGINE_ID,
      device,
      LOCALIZATION_ID,
      false,
    );
    expect(() => keyword.create()).toThrow(InactiveSubscriptionError);
  });

  it('should not add the new keyword when user exceeded available keywords quantity', () => {
    const device = new Device(DESKTOP_DEVICE);
    const keyword = new Keyword(
      true,
      new AvailableKeywordsQuantity(10, 10),
      KEYWORD_ID,
      DOMAIN_ID,
      'test',
      SEARCH_ENGINE_ID,
      device,
      LOCALIZATION_ID,
      false,
    );
    expect(() => keyword.create()).toThrow(IsKeywordsQuantityExceededError);
  });

  it('should not create aggregate when device is wrong value', () => {
    const device = new Device('wrong');
    expect(
      () =>
        new Keyword(
          true,
          new AvailableKeywordsQuantity(10, 10),
          KEYWORD_ID,
          DOMAIN_ID,
          'test',
          SEARCH_ENGINE_ID,
          device,
          LOCALIZATION_ID,
          false,
        ),
    ).toThrow(InvalidDeviceError);
  });
});
