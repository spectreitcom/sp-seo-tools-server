import { ICommand } from '@nestjs/cqrs';

export class ActivateTestingModeCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
