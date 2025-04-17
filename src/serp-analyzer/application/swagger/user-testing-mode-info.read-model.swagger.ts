import { ExpiresAt } from '../../domain/value-objects/expires-at';
import { UserTestingModeInfoReadModel } from '../../infrastructure/read-models/user-testing-mode-info.read-model';
import { ApiProperty } from '@nestjs/swagger';

export class UserTestingModeInfoReadModelSwagger
  implements UserTestingModeInfoReadModel
{
  @ApiProperty({
    example: false,
  })
  public isActive: boolean;

  @ApiProperty({
    example: true,
  })
  public canActivate: boolean;

  @ApiProperty({
    example: new ExpiresAt(12312312312),
  })
  public expiresAt: ExpiresAt | null;
}
