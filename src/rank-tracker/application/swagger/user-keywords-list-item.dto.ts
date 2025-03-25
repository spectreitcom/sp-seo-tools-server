import { RtKeywordGrowth } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { MOBILE_DEVICE } from '../constants';

export class UserKeywordsListItemDto {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly keywordId: string;
  @ApiProperty({
    example: 'the best software house in Warsaw',
  })
  readonly keywordText: string;
  @ApiProperty({
    example: 4,
  })
  readonly lastIndexedPosition: number;
  @ApiProperty({
    example: 'pl',
  })
  readonly localizationCountryCode: string;
  @ApiProperty({
    example: MOBILE_DEVICE,
  })
  readonly device: string;
  @ApiProperty({
    example: 'example.com',
  })
  readonly domain: string;
  @ApiProperty({
    example: 'Poland',
  })
  readonly localizationCountryName: string;
  @ApiProperty({
    example: 'Mobile',
  })
  readonly deviceName: string;
  @ApiProperty({
    example: 'UP',
  })
  readonly growth: RtKeywordGrowth;
}
