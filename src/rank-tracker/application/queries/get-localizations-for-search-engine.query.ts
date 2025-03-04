import { IQuery } from '@nestjs/cqrs';

export class GetLocalizationsForSearchEngineQuery implements IQuery {
  constructor(public readonly searchEngineId: string) {}
}
