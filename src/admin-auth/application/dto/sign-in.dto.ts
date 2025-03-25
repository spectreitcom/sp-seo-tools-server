import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
