import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLocalizationsQuery } from '../queries/get-localizations.query';
import { LocalizationReadModel } from '../../infrastructure/read-models/localization.read-model';
import { LocalizationRepository } from '../ports/localization.repository';

@QueryHandler(GetLocalizationsQuery)
export class GetLocalizationsQueryHandler
  implements IQueryHandler<GetLocalizationsQuery, LocalizationReadModel[]>
{
  constructor(
    private readonly localizationRepository: LocalizationRepository,
  ) {}

  async execute(): Promise<LocalizationReadModel[]> {
    const localizations = await this.localizationRepository.findAll();
    return localizations.map(
      (localization) =>
        new LocalizationReadModel(
          localization.getLocalizationId(),
          localization.getCountryCode(),
          localization.getName(),
        ),
    );
  }
}
