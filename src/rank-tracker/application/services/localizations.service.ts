import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllLocalizationsCountryCodesQuery } from '../queries/get-all-localizations-country-codes.query';
import { GetAllLocalizationsQueryResponse } from '../query-handlers/get-all-localizations-country-codes.query-handler';
import { GetLocalizationsForSearchEngineQuery } from '../queries/get-localizations-for-search-engine.query';
import { GetLocalizationsForSearchEngineQueryResponse } from '../query-handlers/get-localizations-for-search-engine.query-handler';

@Injectable()
export class LocalizationsService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllLocalizationsCountryCodes() {
    return this.queryBus.execute<
      GetAllLocalizationsCountryCodesQuery,
      GetAllLocalizationsQueryResponse
    >(new GetAllLocalizationsCountryCodesQuery());
  }

  getLocalizationsForSearchEngine(searchEngineId: string) {
    return this.queryBus.execute<
      GetLocalizationsForSearchEngineQuery,
      GetLocalizationsForSearchEngineQueryResponse
    >(new GetLocalizationsForSearchEngineQuery(searchEngineId));
  }
}
