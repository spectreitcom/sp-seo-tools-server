import { ICommand } from '@nestjs/cqrs';

export class DeactivateTestingModeCommand implements ICommand {
  constructor(private readonly testingModeId: string) {}
}
