import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ActivateTestingModeCommand } from '../commands/activate-testing-mode.command';
import { GetUserTestingModeInfoQuery } from '../queries/get-user-testing-mode-info.query';
import { UserTestingModeInfoReadModel } from '../../infrastructure/read-models/user-testing-mode-info.read-model';

@Injectable()
export class TestingModeService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  activate(userId: string) {
    return this.commandBus.execute<ActivateTestingModeCommand, void>(
      new ActivateTestingModeCommand(userId),
    );
  }

  getUserTestingModeInfo(userId: string) {
    return this.queryBus.execute<
      GetUserTestingModeInfoQuery,
      UserTestingModeInfoReadModel
    >(new GetUserTestingModeInfoQuery(userId));
  }
}
