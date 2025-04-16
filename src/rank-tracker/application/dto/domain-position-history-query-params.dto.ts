import { Optional } from '@nestjs/common';
import { IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DomainPositionHistoryQueryParamsDto {
  @ApiProperty({
    required: false,
  })
  @Optional()
  readonly fromDate: string | undefined;

  @ApiProperty({
    required: false,
  })
  @Optional()
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
