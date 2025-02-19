import { User, UserAuthProvider } from '@prisma/client';

export abstract class UserRepository {
  abstract create(
    email: string,
    provider: UserAuthProvider,
    googleId?: string,
    password?: string,
  ): Promise<User>;

  abstract findByGoogleId(googleId: string): Promise<User>;

  abstract findById(userId: string): Promise<User>;
}
