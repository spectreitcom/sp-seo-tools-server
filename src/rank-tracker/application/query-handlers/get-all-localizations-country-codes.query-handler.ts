import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllLocalizationsCountryCodesQuery } from '../queries/get-all-localizations-country-codes.query';
import { LocalizationsCountryCodeRepository } from '../ports/localizations-country-code.repository';
import { LocalizationsCountryCodeDto } from '../dto/localizations-country-code.dto';

export type GetAllLocalizationsQueryResponse = LocalizationsCountryCodeDto[];

@QueryHandler(GetAllLocalizationsCountryCodesQuery)
export class GetAllLocalizationsCountryCodesQueryHandler
  implements
    IQueryHandler<
      GetAllLocalizationsCountryCodesQuery,
      GetAllLocalizationsQueryResponse
    >
{
  constructor(
    private readonly localizationsCountryCodeRepository: LocalizationsCountryCodeRepository,
  ) {}

  async execute(
    _: GetAllLocalizationsCountryCodesQuery,
  ): Promise<GetAllLocalizationsQueryResponse> {
    return this.localizationsCountryCodeRepository.findAll();
  }
}
