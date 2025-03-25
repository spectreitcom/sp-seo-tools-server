import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateCommandResponse {
  @ApiProperty()
  readonly accessToken: string;
}
