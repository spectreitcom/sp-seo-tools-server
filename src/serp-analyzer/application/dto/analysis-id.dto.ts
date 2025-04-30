import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalysisIdDto {
  @ApiProperty({
    description: 'The ID of the analysis',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly analysisId: string;
}
