import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthResponseSwagger {
  @ApiProperty()
  readonly accessToken: string;
  @ApiProperty()
  readonly refreshToken: string;
}
