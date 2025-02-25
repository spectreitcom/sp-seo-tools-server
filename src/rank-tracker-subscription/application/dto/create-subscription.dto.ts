import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  readonly name: string;

  @IsPositive()
  readonly amount: number;

  @IsPositive()
  @IsInt()
  readonly maxKeywordsQty: number;

  @IsNotEmpty()
  readonly priceId: string;

  @IsNotEmpty()
  @IsPositive()
  readonly maxSearchedPages: number;
}
