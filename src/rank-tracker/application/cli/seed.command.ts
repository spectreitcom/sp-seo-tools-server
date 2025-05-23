import { Command, CommandRunner, Option } from 'nest-commander';
import { isUUID } from 'class-validator';
import { SeederService } from '../ports/seeder.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

type CommandOptions = {
  user: string;
};

@Command({
  name: 'rt-seed',
  description: 'Creates a dummy data for rank tracker module',
})
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly seederService: SeederService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    super();
  }

  async run(_: string[], options?: CommandOptions): Promise<void> {
    const { user } = options;
    try {
      await this.seederService.seed(user);
      process.exit();
    } catch (e) {
      this.errorHandlerService.logError(e, 'SeedCommand.run');
      process.exit(1);
    }
  }

  @Option({
    flags: '-u, --user <user>',
    required: true,
  })
  private parseUserId(value: string) {
    if (!isUUID(value)) {
      throw new Error('Param user must be a valid uuid');
    }
    return value;
  }
}
