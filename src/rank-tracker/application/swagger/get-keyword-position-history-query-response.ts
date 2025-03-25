import { ApiProperty } from '@nestjs/swagger';
import { DomainPositionHistoryDto } from './domain-position-history.dto';

export class GetKeywordPositionHistoryQueryResponse {
  @ApiProperty({
    type: DomainPositionHistoryDto,
    isArray: true,
  })
  readonly data: DomainPositionHistoryDto[];

  @ApiProperty({
    example: 10,
  })
  readonly total: number;
  @ApiProperty({
    example: 20,
  })
  readonly userTotal: number;
}
