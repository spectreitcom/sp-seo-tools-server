import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLocalizationsQuery } from '../queries/get-localizations.query';
import { Localization } from '../../domain/localization';
import { LocalizationRepository } from '../ports/localization.repository';

export type GetLocalizationsQueryResponse = Pick<
  Localization,
  'localizationId' | 'countryCode' | 'name'
>[];

@QueryHandler(GetLocalizationsQuery)
export class GetLocalizationsQueryHandler
  implements IQueryHandler<GetLocalizationsQuery, GetLocalizationsQueryResponse>
{
  constructor(
    private readonly localizationRepository: LocalizationRepository,
  ) {}

  async execute(
    _: GetLocalizationsQuery,
  ): Promise<GetLocalizationsQueryResponse> {
    const localizations = await this.localizationRepository.findAll();

    return localizations.map((localization) => ({
      localizationId: localization.localizationId,
      countryCode: localization.countryCode,
      name: localization.name,
    }));
  }
}
