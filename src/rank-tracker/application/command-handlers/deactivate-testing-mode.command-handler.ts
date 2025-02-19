import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeactivateTestingModeCommand } from '../commands/deactivate-testing-mode.command';

@CommandHandler(DeactivateTestingModeCommand)
export class DeactivateTestingModeCommandHandler
  implements ICommandHandler<DeactivateTestingModeCommand, void>
{
  async execute(command: DeactivateTestingModeCommand): Promise<void> {
    // todo;
  }
}
