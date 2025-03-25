import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class GetLocalizationQueryResponse {
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
