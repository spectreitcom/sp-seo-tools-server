import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';
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
  readonly page = 1;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly take = 30;

  @ApiProperty({
    required: false,
  })
  @IsUUID()
  @IsOptional()
  readonly localizationId: string | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  readonly device: string | undefined;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  readonly searchText: string | undefined;
}
