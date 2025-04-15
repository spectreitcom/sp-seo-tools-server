import { IQuery } from '@nestjs/cqrs';

export class GetUserAnalysisListQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly page: number,
    public readonly take: number,
    public readonly searchText: string | undefined,
    public readonly localizationId: string | undefined,
    public readonly device: string | undefined,
  ) {}
}
