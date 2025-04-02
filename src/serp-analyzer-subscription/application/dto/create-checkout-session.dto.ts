import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'The id of the plan',
    example: randomUUID(),
  })
  @IsNotEmpty()
  readonly subscriptionId: string;
}
