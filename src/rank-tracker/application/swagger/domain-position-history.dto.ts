import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

export class DomainPositionHistoryDto {
  @ApiProperty({
    example: randomUUID(),
  })
  readonly domainPositionId: string;
  @ApiProperty({
    example: moment().format('YYYY-MM-DD'),
  })
  readonly createdAt: string;
  @ApiProperty({
    example: 4,
  })
  readonly position: number;
}
