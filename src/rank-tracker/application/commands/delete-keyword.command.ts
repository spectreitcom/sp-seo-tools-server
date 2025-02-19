import { ICommand } from '@nestjs/cqrs';

export class DeleteKeywordCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly keywordId: string,
  ) {}
}
