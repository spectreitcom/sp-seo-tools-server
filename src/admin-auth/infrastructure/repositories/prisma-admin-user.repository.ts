import { Injectable } from '@nestjs/common';
import { AdminUserRepository } from '../../application/ports/admin-user.repository';
import { DatabaseService } from '../../../database/database.service';
import { AdminUser } from '@prisma/client';

@Injectable()
export class PrismaAdminUserRepository implements AdminUserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(email: string, hashedPassword: string): Promise<void> {
    await this.databaseService.adminUser.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async exists(email: string): Promise<boolean> {
    const foundUser = await this.databaseService.adminUser.findUnique({
      where: {
        email,
      },
    });
    return !!foundUser;
  }

  findByEmail(email: string): Promise<AdminUser> {
    return this.databaseService.adminUser.findUnique({
      where: { email },
    });
  }
}
