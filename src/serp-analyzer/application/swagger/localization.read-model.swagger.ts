import { LocalizationReadModel } from '../../infrastructure/read-models/localization.read-model';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class LocalizationReadModelSwagger implements LocalizationReadModel {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly localizationId: string;

  @ApiProperty({
    example: 'pl',
  })
  readonly countryCode: string;

  @ApiProperty({
    example: 'Poland',
  })
  readonly name: string;
}
