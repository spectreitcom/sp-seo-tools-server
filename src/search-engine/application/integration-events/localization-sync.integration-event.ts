import { IEvent } from '@nestjs/cqrs';

export type LocalizationData = {
  localizationId: string;
  countryCode: string;
  name: string;
};

export class LocalizationSyncIntegrationEvent implements IEvent {
  constructor(public readonly localizations: LocalizationData[]) {}
}
