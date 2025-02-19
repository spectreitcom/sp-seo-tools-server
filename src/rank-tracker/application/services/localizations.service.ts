import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllLocalizationsCountryCodesQuery } from '../queries/get-all-localizations-country-codes.query';
import { GetAllLocalizationsQueryResponse } from '../query-handlers/get-all-localizations-country-codes.query-handler';

@Injectable()
export class LocalizationsService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllLocalizationsCountryCodes() {
    return this.queryBus.execute<
      GetAllLocalizationsCountryCodesQuery,
      GetAllLocalizationsQueryResponse
    >(new GetAllLocalizationsCountryCodesQuery());
  }
}
