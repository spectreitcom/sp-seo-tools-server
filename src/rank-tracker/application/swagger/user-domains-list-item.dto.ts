import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class UserDomainsListItemDto {
  @ApiProperty({
    description: 'The domainId value',
    example: randomUUID(),
  })
  readonly domainId: string;
  @ApiProperty({
    description: 'The domain value',
    example: 'example.com',
  })
  readonly domain: string;
  @ApiProperty({
    description: 'The number of keywords associated with given domain',
    example: 5,
  })
  readonly keywordsCount: number;
}
