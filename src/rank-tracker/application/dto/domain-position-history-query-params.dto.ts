import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DomainPositionHistoryQueryParamsDto {
  @ApiProperty({
    required: false,
    description: 'Start date in ISO 8601 format (YYYY-MM-DD)',
    example: '2023-01-01',
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsDateString()
  @IsOptional()
  readonly fromDate: string | undefined;

  @ApiProperty({
    required: false,
    description: 'End date in ISO 8601 format (YYYY-MM-DD)',
    example: '2023-12-31',
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsDateString()
  @IsOptional()
  readonly toDate: string | undefined;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  readonly page: number = 1;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  readonly take: number = 30;
}
