import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLocalizationsQuery } from '../queries/get-localizations.query';
import { LocalizationReadModel } from '../../infrastructure/read-models/localization.read-model';

@Injectable()
export class LocalizationService {
  constructor(private readonly queryBus: QueryBus) {}

  getAllLocalizations() {
    return this.queryBus.execute<
      GetLocalizationsQuery,
      LocalizationReadModel[]
    >(new GetLocalizationsQuery());
  }
}
