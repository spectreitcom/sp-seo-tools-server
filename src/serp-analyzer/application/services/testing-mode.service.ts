import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ActivateTestingModeCommand } from '../commands/activate-testing-mode.command';

@Injectable()
export class TestingModeService {
  constructor(private readonly commandBus: CommandBus) {}

  activate(userId: string) {
    return this.commandBus.execute<ActivateTestingModeCommand, void>(
      new ActivateTestingModeCommand(userId),
    );
  }
}
