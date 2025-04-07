import { IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../domain/constants';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateAnalysisDto {
  @ApiProperty({
    description: 'A keyword for analysis',
    example: 'the best software house in Cracow',
  })
  @IsNotEmpty()
  readonly keyword: string;

  @ApiProperty({
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  readonly localizationId: string;

  @ApiProperty({
    example: DESKTOP_DEVICE,
  })
  @IsNotEmpty()
  @IsIn([DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE])
  readonly device: string;
}
