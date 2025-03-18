import { Command, CommandRunner, Option } from 'nest-commander';
import { isEmail } from 'class-validator';
import { CreateAdminCliCommandService } from '../ports/create-admin-cli-command.service';

type CommandOptions = {
  email: string;
  password: string;
};

@Command({ name: 'create-admin', description: 'creates an admin user' })
export class CreateAdminCommand extends CommandRunner {
  constructor(
    private readonly createAdminCliCommandService: CreateAdminCliCommandService,
  ) {
    super();
  }

  async run(_: string[], options?: CommandOptions): Promise<void> {
    const email = options.email;
    const password = options.password;

    try {
      await this.createAdminCliCommandService.createAdmin(email, password);
      process.exit();
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }

  @Option({
    flags: '-e, --email <email>',
    required: true,
  })
  private parseEmail(value: string) {
    if (!isEmail(value)) {
      throw new Error('Invalid email');
    }
    return value;
  }

  @Option({
    flags: '-p, --password <password>',
    required: true,
  })
  private parsePassword(value: string) {
    return value;
  }
}
