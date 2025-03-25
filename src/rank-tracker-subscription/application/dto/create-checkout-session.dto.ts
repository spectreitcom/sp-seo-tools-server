import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly subscriptionId: string;
}
