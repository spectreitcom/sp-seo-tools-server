import { ExpiresAt } from '../../../domain/value-objects/expires-at';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

export class UserTestingModeInfoDto {
  @ApiProperty({
    example: true,
  })
  readonly isActive: boolean;
  @ApiProperty({
    example: false,
  })
  readonly canActivate: boolean;
  @ApiProperty({
    example: new ExpiresAt(moment().unix()),
  })
  readonly expiresAt: ExpiresAt | null;
}
