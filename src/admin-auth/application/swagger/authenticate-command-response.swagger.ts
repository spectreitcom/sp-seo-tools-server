import { ApiProperty } from '@nestjs/swagger';
import { CommandResponse } from '../command-handlers/authenticate.command-handler';

export class AuthenticateCommandResponseSwagger implements CommandResponse {
  @ApiProperty()
  readonly accessToken: string;
}
