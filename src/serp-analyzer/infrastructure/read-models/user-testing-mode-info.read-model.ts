import { ExpiresAt } from '../../domain/value-objects/expires-at';

export class UserTestingModeInfoReadModel {
  constructor(
    public readonly isActive: boolean,
    public readonly canActivate: boolean,
    public readonly expiresAt: ExpiresAt | null,
  ) {}
}
