import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/ports/user.repository';
import { UserAuthProvider, User } from '@prisma/client';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(
    email: string,
    provider: UserAuthProvider,
    googleId?: string,
    password?: string,
    picture?: string,
  ): Promise<User> {
    return this.databaseService.user.create({
      data: {
        googleId,
        email,
        password,
        provider,
        picture,
      },
    });
  }
  findByGoogleId(googleId: string): Promise<User> {
    return this.databaseService.user.findFirst({
      where: {
        googleId,
      },
    });
  }

  async findById(userId: string): Promise<User> {
    return this.databaseService.user.findUnique({
      where: { id: userId },
    });
  }
}
