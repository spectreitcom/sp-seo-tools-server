import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from '../constants';

export class UserKeywordsListQueryParamsDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsNumber()
  @IsOptional()
  readonly page: number = 1;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsNumber()
  @IsOptional()
  readonly take: number = 30;

  @ApiProperty({
    required: false,
    description:
      'Search text for filtering keywords (alphanumeric characters, spaces, and common punctuation only)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?-]*$/, {
    message:
      'searchText can only contain alphanumeric characters, spaces, and common punctuation',
  })
  readonly searchText: string | undefined;

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
  @IsIn([DESKTOP_DEVICE, TABLET_DEVICE, MOBILE_DEVICE])
  readonly device: string | undefined;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsUUID()
  readonly domainId: string | undefined;
}
