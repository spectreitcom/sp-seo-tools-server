export abstract class CreateAdminCliCommandService {
  abstract createAdmin(email: string, password: string): Promise<void>;
}
