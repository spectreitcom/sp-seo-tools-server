import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsPositive()
  readonly amount: number;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  readonly maxKeywordsQty: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly priceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly maxSearchedPages: number;
}
