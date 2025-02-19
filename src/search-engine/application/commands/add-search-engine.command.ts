import { ICommand } from '@nestjs/cqrs';
import { ESearchEngine } from '@prisma/client';

export class AddSearchEngineCommand implements ICommand {
  constructor(
    public readonly searchEngineName: string,
    public readonly engineKey: keyof typeof ESearchEngine,
  ) {}
}
