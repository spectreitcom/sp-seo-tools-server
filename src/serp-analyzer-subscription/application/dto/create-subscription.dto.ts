import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'A name of the plan',
    example: 'Pro',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The price of the plan',
    example: '30',
  })
  @IsNumber()
  @IsPositive()
  readonly amount: number;

  @ApiProperty({
    description: 'How many pages should be searched',
    example: 5,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  readonly searchedPages: number;

  @ApiProperty({
    description: 'Quantity of the queries per month',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  readonly analysisPerMonth: number;

  @ApiProperty({
    description: 'The priceId from stripe',
    example: 'price_1R9NRSBaXoT9VuZdEevqxVnD',
  })
  @IsString()
  @IsNotEmpty()
  readonly priceId: string;
}
