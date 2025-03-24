import { IsNotEmpty } from 'class-validator';

export class AuthenticateByGoogleDto {
  @IsNotEmpty()
  readonly token: string;
}
