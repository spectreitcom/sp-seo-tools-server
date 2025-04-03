import { CreateCheckoutSessionResponse as CreateCheckoutSessionResponseBase } from '../command-handlers/create-checkout-session.command-handler';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionResponse
  implements CreateCheckoutSessionResponseBase
{
  @ApiProperty()
  readonly sessionUrl: string;
}
