import { SubscriptionReadModel as SubscriptionReadModelBase } from '../../infrastructure/read-models/subscription.read-model';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class SubscriptionReadModel implements SubscriptionReadModelBase {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly subscriptionId: string;
  @ApiProperty({
    example: 100,
  })
  readonly analysisPerMonth: number;
  @ApiProperty({
    example: 5,
  })
  readonly searchedPages: number;
  @ApiProperty({
    example: 30,
  })
  readonly amount: number;
  @ApiProperty({
    example: 'Pro',
  })
  readonly name: string;
}
