import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateByGoogleDto {
  @ApiProperty({
    description: "Google's access token",
  })
  @IsNotEmpty()
  readonly token: string;
}
