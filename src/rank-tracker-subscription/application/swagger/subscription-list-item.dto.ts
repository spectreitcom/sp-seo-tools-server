import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SubscriptionListItemDto {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly subscriptionId: string;

  @ApiProperty({
    example: 'Pro',
  })
  readonly name: string;

  @ApiProperty({
    example: 20,
  })
  readonly amount: number;

  @ApiProperty({
    example: 100,
  })
  readonly maxKeywordsQty: number;

  @ApiProperty({
    example: 5,
  })
  readonly maxSearchedPages: number;
}
