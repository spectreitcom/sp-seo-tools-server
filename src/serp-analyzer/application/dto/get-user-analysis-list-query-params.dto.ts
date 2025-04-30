import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetUserAnalysisListQueryParamsDto {
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
  readonly take: number = 30;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsUUID()
  @IsOptional()
  readonly localizationId: string | undefined;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  readonly device: string | undefined;

  @ApiProperty({
    required: false,
    description:
      'Search text for filtering analysis by keyword (alphanumeric characters, spaces, and common punctuation only)',
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?-]*$/, {
    message:
      'searchText can only contain alphanumeric characters, spaces, and common punctuation',
  })
  @IsOptional()
  readonly searchText: string | undefined;
}
