import { CreateCheckoutSessionResponse as CreateCheckoutSessionResponseBase } from '../command-handlers/create-checkout-session.command-handler';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionResponseSwagger
  implements CreateCheckoutSessionResponseBase
{
  @ApiProperty()
  readonly sessionUrl: string;
}
