import { Command, CommandRunner, Option } from 'nest-commander';
import { HashingService } from '../ports/hashing.service';
import { isEmail } from 'class-validator';
import { AdminUserRepository } from '../ports/admin-user.repository';

type CommandOptions = {
  email: string;
  password: Promise<string>;
};

@Command({ name: 'create-admin', description: 'creates an admin user' })
export class CreateAdminCommand extends CommandRunner {
  constructor(
    private readonly hashingService: HashingService,
    private readonly adminUserRepository: AdminUserRepository,
  ) {
    super();
  }

  async run(_: string[], options?: CommandOptions): Promise<void> {
    const email = options.email;
    const hashedPassword = await options.password;

    const exists = await this.adminUserRepository.exists(email);

    if (exists) {
      throw new Error('User already exists in database');
    }

    await this.adminUserRepository.create(email, hashedPassword);
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
    return this.hashingService.hash(value);
  }
}
