import { IQuery } from '@nestjs/cqrs';

export class GetProgressQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public analysisId: string,
  ) {}
}
