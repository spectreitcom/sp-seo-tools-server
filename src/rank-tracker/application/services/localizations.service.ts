import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllLocalizationsCountryCodesQuery } from '../queries/get-all-localizations-country-codes.query';
import { GetAllLocalizationsQueryResponse } from '../query-handlers/get-all-localizations-country-codes.query-handler';
import { GetLocalizationsQuery } from '../queries/get-localizations.query';
import { GetLocalizationsQueryResponse } from '../query-handlers/get-localizations.query-handler';

@Injectable()
export class LocalizationsService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllLocalizationsCountryCodes() {
    return this.queryBus.execute<
      GetAllLocalizationsCountryCodesQuery,
      GetAllLocalizationsQueryResponse
    >(new GetAllLocalizationsCountryCodesQuery());
  }

  getLocalizations() {
    return this.queryBus.execute<
      GetLocalizationsQuery,
      GetLocalizationsQueryResponse
    >(new GetLocalizationsQuery());
  }
}
