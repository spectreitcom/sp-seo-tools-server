import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthResponse {
  @ApiProperty()
  readonly accessToken: string;
  @ApiProperty()
  readonly refreshToken: string;
}
