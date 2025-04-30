import { IsIn, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  TABLET_DEVICE,
} from '../../domain/constants';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateAnalysisDto {
  @ApiProperty({
    description:
      'A keyword for analysis (alphanumeric characters, spaces, and common punctuation only)',
    example: 'the best software house in Cracow',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?-]*$/, {
    message:
      'keyword can only contain alphanumeric characters, spaces, and common punctuation',
  })
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
