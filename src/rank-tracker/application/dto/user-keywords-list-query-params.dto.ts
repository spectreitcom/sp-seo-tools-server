import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
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
  })
  @IsOptional()
  readonly searchText: string | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly localizationId: string | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsIn([DESKTOP_DEVICE, TABLET_DEVICE, MOBILE_DEVICE])
  readonly device: string | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly domainId: string | undefined;
}
