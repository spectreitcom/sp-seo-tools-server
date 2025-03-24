import { IsNotEmpty } from 'class-validator';

export class AddLocalizationDto {
  @IsNotEmpty()
  readonly domainParam: string;
  @IsNotEmpty()
  readonly countryCode: string;
  @IsNotEmpty()
  readonly name: string;
}
