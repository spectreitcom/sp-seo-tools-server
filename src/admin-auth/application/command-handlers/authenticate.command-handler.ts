import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthenticateCommand } from '../commands/authenticate.command';
import { AdminUserRepository } from '../ports/admin-user.repository';
import { BadRequestException } from '@nestjs/common';
import { HashingService } from '../ports/hashing.service';
import { TokenService } from '../ports/token.service';

export type CommandResponse = {
  accessToken: string;
};

@CommandHandler(AuthenticateCommand)
export class AuthenticateCommandHandler
  implements ICommandHandler<AuthenticateCommand, CommandResponse>
{
  constructor(
    private readonly adminUserRepository: AdminUserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: AuthenticateCommand): Promise<CommandResponse> {
    const { email, password } = command;

    const exists = await this.adminUserRepository.exists(email);

    if (!exists) {
      throw new BadRequestException('Wrong credentials');
    }

    const adminUser = await this.adminUserRepository.findByEmail(email);

    const correctPassword = await this.hashingService.compare(
      password,
      adminUser.password,
    );

    if (!correctPassword) {
      throw new BadRequestException('Wrong credentials');
    }

    const accessToken = await this.tokenService.sign(
      adminUser.id,
      adminUser.email,
    );

    return {
      accessToken,
    };
  }
}
