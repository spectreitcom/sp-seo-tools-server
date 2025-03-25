import { IsNotEmpty, IsUUID, IsIn } from 'class-validator';
import { DESKTOP_DEVICE, MOBILE_DEVICE, TABLET_DEVICE } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class AddKeywordDto {
  @ApiProperty({
    description: 'The domainId value',
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  readonly domainId: string;

  @ApiProperty({
    description: 'The value of the keyword',
    example: 'software house in Warsaw',
  })
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({
    description: 'The device value.',
    example: MOBILE_DEVICE,
  })
  @IsNotEmpty()
  @IsIn([DESKTOP_DEVICE, TABLET_DEVICE, MOBILE_DEVICE])
  readonly device: string;

  @ApiProperty({
    description: 'The localizationId value',
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  readonly localizationId: string;
}
