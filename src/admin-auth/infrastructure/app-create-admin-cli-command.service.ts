import { Injectable } from '@nestjs/common';
import { CreateAdminCliCommandService } from '../application/ports/create-admin-cli-command.service';
import { HashingService } from '../application/ports/hashing.service';
import { AdminUserRepository } from '../application/ports/admin-user.repository';

@Injectable()
export class AppCreateAdminCliCommandService
  implements CreateAdminCliCommandService
{
  constructor(
    private readonly hashingService: HashingService,
    private readonly adminUserRepository: AdminUserRepository,
  ) {}

  async createAdmin(email: string, password: string): Promise<void> {
    const hashedPassword = await this.hashingService.hash(password);
    const exists = await this.adminUserRepository.exists(email);

    if (exists) {
      throw new Error('User already exists in database');
    }

    await this.adminUserRepository.create(email, hashedPassword);
  }
}
