import { AdminUser } from '@prisma/client';

export abstract class AdminUserRepository {
  abstract create(email: string, hashedPassword: string): Promise<void>;
  abstract exists(email: string): Promise<boolean>;
  abstract findByEmail(email: string): Promise<AdminUser>;
}
