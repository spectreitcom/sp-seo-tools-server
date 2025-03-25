import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddLocalizationDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly domainParam: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly countryCode: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
}
