import { IsNotEmpty } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNotEmpty()
  readonly subscriptionId: string;
}
