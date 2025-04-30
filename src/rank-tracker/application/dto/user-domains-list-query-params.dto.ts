import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDomainsListQueryParamsDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly page: number = 1;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly take: number = 1;

  @ApiProperty({
    required: false,
    description:
      'Search text for filtering domains (alphanumeric characters, spaces, and common punctuation only)',
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?-]*$/, {
    message:
      'searchText can only contain alphanumeric characters, spaces, and common punctuation',
  })
  @IsOptional()
  readonly searchText: string | undefined;
}
