import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLocalizationsForSearchEngineQuery } from '../queries/get-localizations-for-search-engine.query';
import { Localization } from '../../domain/localization';
import { LocalizationRepository } from '../ports/localization.repository';

export type GetLocalizationsForSearchEngineQueryResponse = Pick<
  Localization,
  'localizationId' | 'countryCode' | 'name'
>[];

@QueryHandler(GetLocalizationsForSearchEngineQuery)
export class GetLocalizationsForSearchEngineQueryHandler
  implements
    IQueryHandler<
      GetLocalizationsForSearchEngineQuery,
      GetLocalizationsForSearchEngineQueryResponse
    >
{
  constructor(
    private readonly localizationRepository: LocalizationRepository,
  ) {}

  async execute(
    query: GetLocalizationsForSearchEngineQuery,
  ): Promise<GetLocalizationsForSearchEngineQueryResponse> {
    const { searchEngineId } = query;

    const localizations =
      await this.localizationRepository.findBySearchEngine(searchEngineId);

    return localizations.map((localization) => ({
      localizationId: localization.localizationId,
      countryCode: localization.countryCode,
      name: localization.name,
    }));
  }
}
